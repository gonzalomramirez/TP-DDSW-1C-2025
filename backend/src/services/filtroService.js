import { ValidationError } from "../errors/AppError.js";

export function desnormalizarParametroBusqueda(valor) {
    if (!valor) return null;

    return valor
        .replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
}

export class FiltroService {
    static filtrarCiudad(ciudad) {
        if (!ciudad) return null;
        return {
            'direccion.ciudad.nombre': {
                $regex: new RegExp(`^${ciudad}$`, 'i')  // sólo regex por case-insensitive
            }
        };
    }

    static filtrarPais(pais) {
        if (!pais) return null;
        return {
            'direccion.ciudad.pais.nombre': {
                $regex: new RegExp(`^${pais}$`, 'i')
            }
        };
    }

    static filtrarCalle(calle, altura) {
        if (!calle && altura) {
            throw new ValidationError("No se puede ingresar altura sin una calle.");
        }

        const filtros = {};

        if (calle) {
            filtros['direccion.calle'] = {
                $regex: new RegExp(`^${calle}$`, 'i')
            };
        }

        if (altura && !isNaN(altura)) {
            const alturaNum = parseInt(altura);
            const margen = 1000;
            filtros['direccion.altura'] = {
                $gte: alturaNum - margen,
                $lte: alturaNum + margen
            };
        }

        return Object.keys(filtros).length > 0 ? filtros : null;
    }

    static filtrarHuespedes(cantidad) {
        if (!cantidad || isNaN(cantidad)) return null;
        return {
            cantidadMaximaHuespedes: { $gte: parseInt(cantidad) }
        };
    }

    static filtrarCaracteristicas(caracteristicas) {
        if (!caracteristicas) return null;
        const array = caracteristicas.split(',').map(c => c.trim().toUpperCase());
        return { caracteristicas: { $all: array } };
    }

    static convertirAPesos(monto, moneda) {
        const TIPOS_DE_CAMBIO = {
            DOLAR_USA: 1100,  // 1 USD = 1100 ARS
            PESO_ARG: 1,      // 1 ARS = 1 ARS
            REAL: 220         // 1 BRL = 220 ARS
        };

        if (!TIPOS_DE_CAMBIO[moneda]) {
            throw new Error(`Moneda no soportada: ${moneda}`);
        }

        return monto * TIPOS_DE_CAMBIO[moneda];
    }

    static filtrarPorPrecioEnPesos(alojamientos, min, max, monedaReferencia) {
        const minNum = parseFloat(min);
        const maxNum = parseFloat(max);

        // Convertimos los límites a pesos
        const minEnPesos = isNaN(minNum) ? null : this.convertirAPesos(minNum, monedaReferencia);
        const maxEnPesos = isNaN(maxNum) ? null : this.convertirAPesos(maxNum, monedaReferencia);

        return alojamientos.filter(alojamiento => {
            const precioEnPesos = this.convertirAPesos(alojamiento.precioPorNoche, alojamiento.moneda);

            if (minEnPesos !== null && precioEnPesos < minEnPesos) {
                return false;
            }
            if (maxEnPesos !== null && precioEnPesos > maxEnPesos) {
                return false;
            }
            return true;
        });
    }

    static async filtrarPorDisponibilidad(alojamientos, checkIn, checkOut, reservaRepository) {
        if (!checkIn || !checkOut) return alojamientos;

        const rangoFecha = {
            fechaInicio: new Date(checkIn),
            fechaFin: new Date(checkOut)
        };

        const idsAlojamientos = alojamientos.map(a => a.id);

        const reservasSolapadas = await reservaRepository.model.find({
            alojamiento: { $in: idsAlojamientos },
            estado: 'CONFIRMADA',
            'rangoFechas.fechaInicio': { $lte: rangoFecha.fechaFin },
            'rangoFechas.fechaFin': { $gte: rangoFecha.fechaInicio }
        });

        const idsOcupados = reservasSolapadas.map(r => r.alojamiento.toString());

        return alojamientos.filter(a => !idsOcupados.includes(a.id.toString()));
    }

    static async construirFiltros(queryParams) {
        const {
            ciudad, pais, calle, altura,
            cantidadHuespedes, caracteristicas,
        } = queryParams;

        const filtros = {};

        const filtrosIndividuales = [
            this.filtrarCiudad(desnormalizarParametroBusqueda(ciudad)),
            this.filtrarPais(desnormalizarParametroBusqueda(pais)),
            this.filtrarCalle(desnormalizarParametroBusqueda(calle), altura),
            this.filtrarHuespedes(cantidadHuespedes),
            this.filtrarCaracteristicas(caracteristicas),
        ];

        filtrosIndividuales.forEach(f => {
            if (f) Object.assign(filtros, f);
        });

        return filtros;
    }
}
