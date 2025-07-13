import { UsuarioRepository } from '../../src/models/repositories/usuarioRepository.js';
import { describe, expect, jest, beforeEach } from '@jest/globals';

describe('UsuarioRepository (unit test)', () => {
    let mockModel;
    let repo;

    beforeEach(() => {
        mockModel = {
            findOneAndUpdate: jest.fn().mockResolvedValue('usuario guardado')
        };

        repo = new UsuarioRepository();
        repo.model = mockModel;
    });

    test('save guarda un usuario nuevo o actualiza uno existente', async () => {
        const usuarioMock = {
            id: 'user123',
            nombre: 'Juan Pérez',
            email: 'juan@birbnb.com'
        };

        const result = await repo.save(usuarioMock);

        expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: 'user123' },
            usuarioMock,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
        expect(result).toBe('usuario guardado');
    });
});
