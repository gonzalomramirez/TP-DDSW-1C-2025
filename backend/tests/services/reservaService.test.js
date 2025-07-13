import { ReservaService} from "../../src/services/reservaService.js";
import { ValidationError, AlreadyExistsError, NotFoundError } from '../../src/errors/AppError.js';
import {beforeEach, describe, expect, jest} from '@jest/globals';

describe('ReservaService', () => {
  let reservaRepository, notificacionRepository, alojamientoRepository, cambioEstadoReservaRepository, service;

  beforeEach(() => {
    reservaRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findReservaExistente: jest.fn(),
      verificarDisponibilidad: jest.fn(),
      save: jest.fn(),
      findByUser: jest.fn()
    };

    notificacionRepository = { save: jest.fn() };
    alojamientoRepository = {
      findById: jest.fn(),
      precioPorNoche: jest.fn(),
      save: jest.fn()
    };
    cambioEstadoReservaRepository = { save: jest.fn() };

    service = new ReservaService(
        reservaRepository,
        notificacionRepository,
        alojamientoRepository,
        cambioEstadoReservaRepository
    );
    jest.clearAllMocks();
  });

  test('debería lanzar ValidationError si faltan datos en create()', async () => {
    const datos = {
      huespedReservadorId: '',
      cantHuespedes: 2,
      alojamientoId: '',
      fechaInicio: null,
      fechaFin: null
    };
    await expect(service.create(datos)).rejects.toThrow(ValidationError);
  });

  test('debería lanzar AlreadyExistsError si la reserva ya existe', async () => {
    const datos = {
      huespedReservadorId: 'u1',
      cantHuespedes: 2,
      alojamientoId: 'a1',
      fechaInicio: new Date(),
      fechaFin: new Date(Date.now() + 86400000)
    };
    alojamientoRepository.findById.mockResolvedValue({});
    reservaRepository.findReservaExistente.mockResolvedValue(true);
    await expect(service.create(datos)).rejects.toThrow(AlreadyExistsError);
  });

  test('debería crear una reserva correctamente', async () => {
    const alojamientoMock = { agregarReserva: jest.fn(), id: 'a1' };
    const datos = {
      huespedReservadorId: 'u1',
      cantHuespedes: 2,
      alojamientoId: 'a1',
      fechaInicio: new Date(),
      fechaFin: new Date(Date.now() + 86400000)
    };
    alojamientoRepository.findById.mockResolvedValue(alojamientoMock);
    reservaRepository.findReservaExistente.mockResolvedValue(null);
    alojamientoRepository.precioPorNoche.mockResolvedValue(1000);
    reservaRepository.save.mockImplementation((r) => Promise.resolve({ ...r, _id: 'r1' }));
    alojamientoRepository.save.mockResolvedValue(true);

    const result = await service.create(datos);
    expect(result.huespedReservador).toBe('u1');
    expect(alojamientoMock.agregarReserva).toHaveBeenCalled();
  });

  test('debería lanzar NotFoundError al confirmar reserva inexistente', async () => {
    reservaRepository.findById.mockResolvedValue(null);
    await expect(service.confirmarReserva('404')).rejects.toThrow(NotFoundError);
  });

  test('debería lanzar ValidationError al confirmar reserva vencida', async () => {
    reservaRepository.findById.mockResolvedValue({
      rangoFechas: { fechaInicio: new Date('2000-01-01') }
    });
    await expect(service.confirmarReserva('1')).rejects.toThrow(ValidationError);
  });

  test('confirmarReserva debería actualizar y notificar correctamente', async () => {
    const reservaMock = {
      rangoFechas: { fechaInicio: new Date(Date.now() + 86400000) },
      alojamiento: 'aloja123',
      confirmar: jest.fn()
    };

    reservaRepository.findById.mockResolvedValue(reservaMock);
    reservaRepository.save.mockResolvedValue({ id: 'res1', estado: 'CONFIRMADA' });

    alojamientoRepository.findById.mockResolvedValue({
      nombre: 'Cabaña del Bosque',
      anfitrion: 'anfitrion123'
    });

    const result = await service.confirmarReserva('res1');

    expect(reservaMock.confirmar).toHaveBeenCalled();
    expect(notificacionRepository.save).toHaveBeenCalled();
    expect(cambioEstadoReservaRepository.save).toHaveBeenCalled();
    expect(result.estado).toBe('CONFIRMADA');
  });

  test('cancelarReserva debería guardar estado y notificación', async () => {
    const reservaMock = {
      _id: 'res2',
      rangoFechas: { fechaInicio: new Date(Date.now() + 86400000) },
      huespedReservador: { _id: 'user1', toString: () => 'user1' },
      alojamiento: { _id: 'aloja123', anfitrion: 'anfitrion123' },
      cancelar: jest.fn()
    };

    reservaRepository.findById.mockResolvedValue(reservaMock);
    reservaRepository.save.mockResolvedValue({ ...reservaMock, estado: 'CANCELADA' });

    alojamientoRepository.findById.mockResolvedValue({
      nombre: 'Casa en la Playa',
      anfitrion: 'anfitrion123'
    });

    const result = await service.cancelarReserva('res2', 'No puedo viajar', 'user1');

    expect(reservaMock.cancelar).toHaveBeenCalled();
    expect(reservaRepository.save).toHaveBeenCalled();
    expect(cambioEstadoReservaRepository.save).toHaveBeenCalled();
    expect(notificacionRepository.save).toHaveBeenCalled();
    expect(result.estado).toBe('CANCELADA');
  });

});
