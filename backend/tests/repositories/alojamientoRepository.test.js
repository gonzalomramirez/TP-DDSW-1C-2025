import { AlojamientoRepository} from "../../src/models/repositories/alojamientoRepository.js";
import {beforeEach, describe, expect, jest} from "@jest/globals";

describe('AlojamientoRepository (unit tests)', () => {
    let repo;
    let mockModel;

    beforeEach(() => {
        mockModel = {
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn()
        };
        repo = new AlojamientoRepository();
        repo.model = mockModel;
        jest.clearAllMocks();
    });

    test('findAll aplica panelFiltros correctamente', async () => {
        const filtros = { ciudad: 'Bariloche' };
        mockModel.find.mockResolvedValue(['alojamiento1', 'alojamiento2']);

        const result = await repo.findAll(filtros);

        expect(mockModel.find).toHaveBeenCalledWith(filtros);
        expect(result).toEqual(['alojamiento1', 'alojamiento2']);
    });

    test('findById busca correctamente por ID', async () => {
        const alojamientoMock = { nombre: 'Aloja 1' };

        const secondPopulate = jest.fn().mockResolvedValue(alojamientoMock);
        const firstPopulate = jest.fn().mockReturnValue({ populate: secondPopulate });

        mockModel.findById.mockReturnValue({ populate: firstPopulate });

        const result = await repo.findById('123');

        expect(mockModel.findById).toHaveBeenCalledWith('123', null, null);
        expect(result).toEqual(alojamientoMock);
    });

    test('findByName busca correctamente por nombre', async () => {
        const alojamientoMock = { nombre: 'Aloja 2' };

        const secondPopulate = jest.fn().mockResolvedValue(alojamientoMock);
        const firstPopulate = jest.fn().mockReturnValue({ populate: secondPopulate });

        mockModel.findOne.mockReturnValue({ populate: firstPopulate });

        const result = await repo.findByName('Aloja 2');

        expect(mockModel.findOne).toHaveBeenCalledWith({ nombre: 'Aloja 2' });
        expect(result).toEqual(alojamientoMock);
    });

    test('save inserta o actualiza correctamente', async () => {
        const alojamiento = { id: '123', nombre: 'Aloja 3' };

        const populated = jest.fn().mockResolvedValue(alojamiento);
        mockModel.findOneAndUpdate.mockReturnValue({ populate: populated });

        const result = await repo.save(alojamiento);

        expect(mockModel.findOneAndUpdate).toHaveBeenCalled();
        expect(result).toEqual(alojamiento);
    });

    test('precioPorNoche devuelve correctamente el precio', async () => {
        const alojamiento = { precioPorNoche: 100 };
        mockModel.findById.mockResolvedValue(alojamiento);

        const result = await repo.precioPorNoche('456');

        expect(mockModel.findById).toHaveBeenCalledWith('456', 'precioPorNoche');
        expect(result).toBe(100);
    });

    test('precioPorNoche lanza error si no existe el alojamiento', async () => {
        mockModel.findById.mockResolvedValue(null);

        await expect(repo.precioPorNoche('789')).rejects.toThrow('Alojamiento con ID 789 no encontrado');
    });
});
