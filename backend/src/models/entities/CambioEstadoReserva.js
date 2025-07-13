export class CambioEstadoReserva {
    constructor(reserva, motivo) {
        this.reserva = reserva;
        this.motivo = motivo ? motivo : "Reserva confirmada";
        this.usuario = reserva.huespedReservador;
    }
}