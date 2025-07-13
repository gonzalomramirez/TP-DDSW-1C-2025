import { UsuarioService} from "../../src/services/usuarioService.js";
import { AlreadyExistsError, ValidationError } from "../../src/errors/AppError.js";
import {beforeEach, describe, expect, jest} from '@jest/globals';

describe('UsuarioService', () => {
  let usuarioRepository, reservaRepository, service;

  beforeEach(() => {
    usuarioRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn()
    };

    reservaRepository = {
      findByUser: jest.fn()
    };

    service = new UsuarioService(usuarioRepository, reservaRepository);
    jest.clearAllMocks();
  });

  test('debería lanzar ValidationError si faltan nombre o email en create()', async () => {
    const datos = { tipo: 'HUESPED', nombre: '' };
    await expect(service.create(datos)).rejects.toThrow(ValidationError);
  });

  test('debería lanzar AlreadyExistsError si el mail ya existe', async () => {
    const datos = { tipo: 'HUESPED', nombre: 'Juan', email: 'juan@mail.com' };
    usuarioRepository.findByEmail.mockResolvedValue(true);
    await expect(service.create(datos)).rejects.toThrow(AlreadyExistsError);
  });

  test('debería crear un usuario correctamente', async () => {
    const datos = { tipo: 'HUESPED', nombre: 'Ana', email: 'ana@mail.com' };
    usuarioRepository.findByEmail.mockResolvedValue(null);
    usuarioRepository.save.mockImplementation((u) => Promise.resolve(u));

    const result = await service.create(datos);
    expect(result.nombre).toBe('Ana');
    expect(usuarioRepository.save).toHaveBeenCalled();
  });

  test('findAll debe retornar usuarios en formato DTO', async () => {
    usuarioRepository.findAll.mockResolvedValue([
      { tipo: 'ANFITRION', nombre: 'Carlos', email: 'carlos@mail.com' }
    ]);
    const result = await service.findAll();
    expect(result[0].nombre).toBe('Carlos');
  });

  test('findById debe llamar al repositorio', async () => {
    usuarioRepository.findById.mockResolvedValue({ nombre: 'Pedro' });
    const result = await service.findById('123');
    expect(result.nombre).toBe('Pedro');
  });

  test('reservasPorUsuario debe lanzar error si usuario no existe', async () => {
    usuarioRepository.findById.mockReturnValue(null);
    await expect(service.reservasPorUsuario('999')).rejects.toThrow(ValidationError);
  });

  test('reservasPorUsuario debe retornar reservas si el usuario existe', async () => {
    usuarioRepository.findById.mockReturnValue({});
    reservaRepository.findByUser.mockResolvedValue([{ id: 'reserva1' }]);
    const result = await service.reservasPorUsuario('321');
    expect(result).toHaveLength(1);
  });
});
