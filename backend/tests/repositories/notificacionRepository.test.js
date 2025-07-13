import { NotificacionRepository } from '../../src/models/repositories/notificacionRepository.js';
import { describe, expect, jest, beforeEach } from '@jest/globals';

describe('NotificacionRepository (unit test)', () => {
    let mockModel;
    let repo;

    beforeEach(() => {
        mockModel = {
            findOneAndUpdate: jest.fn(() => ({
                populate: jest.fn().mockReturnValue('notificación guardada')
            }))
        };

        repo = new NotificacionRepository();
        repo.model = mockModel;
    });

    test('save guarda una nueva notificación o actualiza una existente', async () => {
        const notificacionMock = {
            id: 'notif123',
            mensaje: '¡Tu reserva fue confirmada!',
            usuario: 'user123'
        };

        const result = await repo.save(notificacionMock);

        expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: 'notif123' },
            notificacionMock,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
        expect(result).toBe('notificación guardada');
    });
});
