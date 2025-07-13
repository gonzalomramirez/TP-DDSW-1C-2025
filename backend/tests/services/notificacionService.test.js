import { NotificacionService} from "../../src/services/notificacionService.js";
import {beforeEach, describe, expect, jest} from '@jest/globals';

describe('NotificacionService', () => {
  let notificacionRepository, service;

  beforeEach(() => {
    notificacionRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByUsuarioId: jest.fn(),
      findByUsuarioAndEstado: jest.fn(),
      save: jest.fn()
    };

    service = new NotificacionService(notificacionRepository);
    jest.clearAllMocks();
  });

  test('findAll devuelve todas las notificaciones', async () => {
    notificacionRepository.findAll.mockResolvedValue([{ id: 'n1' }]);
    const result = await service.findAll();
    expect(result).toHaveLength(1);
  });

  test('findById devuelve una notificación específica', async () => {
    notificacionRepository.findById.mockResolvedValue({ id: 'n1', mensaje: 'Hola' });
    const result = await service.findById('n1');
    expect(result.id).toBe('n1');
  });

  test('findByUsuarioId devuelve notificaciones de un usuario', async () => {
    notificacionRepository.findByUsuarioId.mockResolvedValue([{ id: 'n1' }]);
    const result = await service.findByUsuarioId('user1');
    expect(result[0].id).toBe('n1');
  });

  test('findByUsuarioAndEstado filtra correctamente', async () => {
    notificacionRepository.findByUsuarioAndEstado.mockResolvedValue([{ id: 'n1', leida: false }]);
    const result = await service.findByUsuarioAndEstado('user1', false);
    expect(result[0].leida).toBe(false);
  });

  test('marcarLeida lanza error si no existe la notificación', async () => {
    notificacionRepository.findById.mockResolvedValue(null);
    await expect(service.marcarLeida('noexiste')).rejects.toThrow('Notificación no encontrada');
  });

  test('marcarLeida actualiza y guarda si existe', async () => {
    const mockNoti = { id: 'n1', marcarComoLeida: jest.fn() };
    notificacionRepository.findById.mockResolvedValue(mockNoti);
    notificacionRepository.save.mockResolvedValue({ ...mockNoti, leida: true });

    const result = await service.marcarLeida('n1');
    expect(mockNoti.marcarComoLeida).toHaveBeenCalled();
    expect(notificacionRepository.save).toHaveBeenCalledWith(mockNoti);
    expect(result.leida).toBe(true);
  });
});
