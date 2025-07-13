import {ESTADO_RESERVA} from "../../utils/constantes.js";
import {ConflictError} from "../../errors/AppError.js";

class Reserva {
    id;

    constructor(huespedReservador, cantHuespedes, alojamiento, rangoFechas, precioPorNoche) {
        this.fechaAlta = new Date();
        this.huespedReservador = huespedReservador;
        this.cantHuespedes = cantHuespedes;
        this.alojamiento = alojamiento;
        this.rangoFechas = rangoFechas;
        this.estado = ESTADO_RESERVA.PENDIENTE;
        this.precioPorNoche = precioPorNoche;
    }

    confirmar() {
        this.estado = ESTADO_RESERVA.CONFIRMADA;
    }
    cancelar() {
        this.estado = ESTADO_RESERVA.CANCELADA;
    }
    rechazar() {
        this.estado = ESTADO_RESERVA.CANCELADA;
    }
    actualizarRangoFechas(nuevoRangoFechas) {
        this.rangoFechas = nuevoRangoFechas;
    }
}

export { Reserva };