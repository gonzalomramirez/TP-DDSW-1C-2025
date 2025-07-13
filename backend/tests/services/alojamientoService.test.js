import { AlojamientoService } from "../../src/services/AlojamientoService.js";
import { ValidationError, AlreadyExistsError } from "../../src/errors/AppError.js";
import { FiltroService } from "../../src/services/filtroService.js";
import { Alojamiento } from "../../src/models/entities/Alojamiento.js";
import {beforeEach, describe, expect, jest} from "@jest/globals";

describe('AlojamientoService', () => {
  let alojamientoRepository;
  let usuarioRepository;
  let service;

  beforeEach(() => {
    alojamientoRepository = {
      findByName: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn()
    };
    usuarioRepository = { findById: jest.fn() };
    service = new AlojamientoService(alojamientoRepository, usuarioRepository);
    jest.clearAllMocks();
  });

  test('debería lanzar ValidationError si faltan datos obligatorios', async () => {
    const alojamientoIncompleto = { nombre: 'Casa 1' };
    await expect(service.create(alojamientoIncompleto)).rejects.toThrow(ValidationError);
  });

  test('debería lanzar AlreadyExistsError si ya existe el alojamiento', async () => {
    const alojamiento = {
      anfitrion: 'user123', nombre: 'Casa 1', descripcion: 'desc',
      precioPorNoche: 100, moneda: 'ARS', horarioCheckIn: '14:00',
      horarioCheckOut: '11:00', calle: 'Falsa', altura: 123,
      nombreCiudad: 'Palermo', nombrePais: 'Argentina',
      cantidadMaximaHuespedes: 4, caracteristicas: [], fotos: []
    };
    alojamientoRepository.findByName.mockResolvedValue(true);
    await expect(service.create(alojamiento)).rejects.toThrow(AlreadyExistsError);
  });

  test('debería lanzar ValidationError si el usuario no es anfitrión', async () => {
    const alojamiento = {
      anfitrion: 'user123', nombre: 'Casa 1', descripcion: 'desc',
      precioPorNoche: 100, moneda: 'ARS', horarioCheckIn: '14:00',
      horarioCheckOut: '11:00', calle: 'Falsa', altura: 123,
      nombreCiudad: 'Palermo', nombrePais: 'Argentina',
      cantidadMaximaHuespedes: 4, caracteristicas: [], fotos: []
    };
    alojamientoRepository.findByName.mockResolvedValue(null);
    usuarioRepository.findById.mockResolvedValue({ esAnfitrion: () => false });
    await expect(service.create(alojamiento)).rejects.toThrow(ValidationError);
  });

  test('debería crear un alojamiento exitosamente si los datos son válidos', async () => {
    const alojamiento = {
      anfitrion: 'user123', nombre: 'Casa Feliz', descripcion: 'Hermosa casa en la montaña',
      precioPorNoche: 200, moneda: 'USD', horarioCheckIn: '15:00',
      horarioCheckOut: '10:00', calle: 'Montaña Azul', altura: 456,
      nombreCiudad: 'Bariloche', nombrePais: 'Argentina',
      cantidadMaximaHuespedes: 6, caracteristicas: ['Wifi'], fotos: []
    };

    alojamientoRepository.findByName.mockResolvedValue(null);
    usuarioRepository.findById.mockResolvedValue({ esAnfitrion: () => true });

    alojamientoRepository.save.mockImplementation((aloj) => Promise.resolve(aloj));

    const result = await service.create(alojamiento);

    expect(result).toBeInstanceOf(Alojamiento);
    expect(alojamientoRepository.save).toHaveBeenCalled();
  });

  test('findAll debería retornar los datos paginados correctamente', async () => {
    const filtros = { ciudad: 'Bariloche' };
    const mockAlojamientos = Array.from({ length: 15 }, (_, i) => ({
      nombre: `Alojamiento ${i + 1}`,
      precioPorNoche: 1500 + i * 100,
      moneda: 'PESO_ARG'
    }));

    alojamientoRepository.findAll.mockResolvedValue(mockAlojamientos);

    FiltroService.construirFiltros = jest.fn().mockReturnValue(filtros);

    const resultado = await service.findAll({ ciudad: 'Bariloche' }, 2, 5);

    expect(FiltroService.construirFiltros).toHaveBeenCalledWith({ ciudad: 'Bariloche' });
    expect(alojamientoRepository.findAll).toHaveBeenCalledWith(filtros);
    expect(resultado).toEqual(mockAlojamientos.slice(5, 10));
  });
});
