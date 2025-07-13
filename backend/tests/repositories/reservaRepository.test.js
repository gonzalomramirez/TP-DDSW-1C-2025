import { ReservaRepository } from '../../src/models/repositories/reservaRepository.js';
import { ConflictError } from '../../src/errors/AppError.js';
import { describe, expect, jest, beforeEach } from '@jest/globals';

describe('ReservaRepository (unit tests)', () => {
    let mockModel;
    let repo;

    beforeEach(() => {
        mockModel = {
            findById: jest.fn(() => ({ populate: jest.fn().mockReturnValue('reserva poblada') })),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(() => ({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockReturnValue('reserva guardada')
                })
            }))
        };

        repo = new ReservaRepository();
        repo.model = mockModel; // inyectamos el mock
    });

    test('findReservaExistente devuelve la reserva esperada', async () => {
        const mockReserva = { id: 'resX' };
        mockModel.findOne.mockResolvedValue(mockReserva);

        const result = await repo.findReservaExistente('user1', 'aloja1', {
            fechaInicio: '2025-06-01',
            fechaFin: '2025-06-05'
        });

        expect(mockModel.findOne).toHaveBeenCalledWith({
            huespedReservador: 'user1',
            alojamiento: 'aloja1',
            'rangoFechas.fechaInicio': '2025-06-01',
            'rangoFechas.fechaFin': '2025-06-05'
        });
        expect(result).toBe(mockReserva);
    });

    test('obtenerReservaSolapada devuelve reserva si hay solapamiento', async () => {
        const mockReserva = { id: 'resY' };
        mockModel.findOne.mockResolvedValue(mockReserva);

        const result = await repo.obtenerReservaSolapada('aloja2', {
            fechaInicio: '2025-06-10',
            fechaFin: '2025-06-15'
        });

        expect(mockModel.findOne).toHaveBeenCalledWith({
            alojamiento: 'aloja2',
            estado: 'CONFIRMADA',
            'rangoFechas.fechaInicio': { $lt: '2025-06-15' },
            'rangoFechas.fechaFin': { $gt: '2025-06-10' }
        });
        expect(result).toBe(mockReserva);
    });

    test('verificarDisponibilidad lanza ConflictError si hay solapamiento', async () => {
        const mockSolapada = {
            rangoFechas: {
                fechaInicio: new Date('2025-07-01'),
                fechaFin: new Date('2025-07-10')
            }
        };
        mockModel.findOne.mockResolvedValue(mockSolapada);

        await expect(repo.verificarDisponibilidad('aloja3', {
            fechaInicio: new Date('2025-07-05'),
            fechaFin: new Date('2025-07-08')
        })).rejects.toThrow(ConflictError);

        expect(mockModel.findOne).toHaveBeenCalledWith(expect.objectContaining({
            alojamiento: 'aloja3',
            estado: 'CONFIRMADA'
        }));
    });

    test('verificarDisponibilidad no lanza error si no hay solapamiento', async () => {
        mockModel.findOne.mockResolvedValue(null);

        await expect(repo.verificarDisponibilidad('aloja4', {
            fechaInicio: new Date('2025-08-01'),
            fechaFin: new Date('2025-08-05')
        })).resolves.not.toThrow();
    });
});
