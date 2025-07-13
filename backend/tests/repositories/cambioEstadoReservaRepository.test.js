import { CambioEstadoReservaRepository } from '../../src/models/repositories/cambioEstadoReservaRepository.js';
import { describe, expect, jest, beforeEach } from '@jest/globals';

describe('CambioEstadoReservaRepository (unit test)', () => {
    let mockModel;
    let repo;

    beforeEach(() => {
        // Cadena de populate().populate()
        const mockPopulateUsuario = jest.fn().mockReturnValue('cambio estado guardado');
        const mockPopulateReserva = jest.fn().mockReturnValue({ populate: mockPopulateUsuario });

        mockModel = {
            findOneAndUpdate: jest.fn(() => ({
                populate: mockPopulateReserva
            }))
        };

        repo = new CambioEstadoReservaRepository();
        repo.model = mockModel;
    });

    test('save guarda un cambio de estado y hace populate de reserva y usuario', async () => {
        const cambioMock = {
            id: 'cambio123',
            reserva: 'res123',
            usuario: 'user123',
            motivo: 'Modificación de fechas'
        };

        const result = await repo.save(cambioMock);

        expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: 'cambio123' },
            cambioMock,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
        expect(result).toBe('cambio estado guardado');
    });
});
