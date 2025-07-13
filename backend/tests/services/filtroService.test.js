import { FiltroService } from '../../src/services/filtroService.js';
import { ValidationError } from '../../src/errors/AppError.js';
import { describe, expect, test } from '@jest/globals';

describe('FiltroService', () => {
    test('filtrarCiudad retorna regex correcto', () => {
        const result = FiltroService.filtrarCiudad('Buenos Aires');
        expect(result['direccion.ciudad.nombre'].$regex).toBeInstanceOf(RegExp);
    });

    test('filtrarPais retorna regex correcto', () => {
        const result = FiltroService.filtrarPais('Argentina');
        expect(result['direccion.ciudad.pais.nombre'].$regex).toBeInstanceOf(RegExp);
    });

    test('filtrarCalle lanza error si calle no está definida', () => {
        expect(() => FiltroService.filtrarCalle(null, 123)).toThrow(ValidationError);
    });

    test('filtrarCalle con calle y altura válida retorna filtros correctos', () => {
        const result = FiltroService.filtrarCalle('Mitre', '1200');
        expect(result['direccion.calle'].$regex).toBeInstanceOf(RegExp);
        expect(result['direccion.altura']).toMatchObject({ $gte: 200, $lte: 2200 });
    });

    test('filtrarHuespedes con valor válido', () => {
        const result = FiltroService.filtrarHuespedes('4');
        expect(result).toEqual({ cantidadMaximaHuespedes: { $gte: 4 } });
    });

    test('filtrarCaracteristicas convierte string en array', () => {
        const result = FiltroService.filtrarCaracteristicas('wifi,piscina');
        expect(result).toEqual({ caracteristicas: { $all: ['WIFI', 'PISCINA'] } });
    });

    test('construirFiltros combina múltiples filtros válidos', async () => {
        const filtros = await FiltroService.construirFiltros({
            ciudad: 'Cordoba',
            pais: 'Argentina',
            calle: 'Mitre',
            altura: '1500',
            cantidadHuespedes: '4',
            caracteristicas: 'wifi,pileta'
        });

        expect(filtros['direccion.ciudad.nombre']).toBeDefined();
        expect(filtros['direccion.ciudad.pais.nombre']).toBeDefined();
        expect(filtros['direccion.calle']).toBeDefined();
        expect(filtros['direccion.altura']).toBeDefined();
        expect(filtros.cantidadMaximaHuespedes).toBeDefined();
        expect(filtros.caracteristicas).toBeDefined();
    });
});