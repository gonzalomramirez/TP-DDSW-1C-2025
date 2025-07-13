import { Notificacion } from './Notificacion.js';

class FactoryNotificacion {
    static crearSegunReserva(reserva, nombre) {
        const mensaje = `Nueva reserva de ${reserva.huespedReservador.nombre} en ${nombre} para el día ${new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString('es-AR', {timeZone: 'UTC'})}`;
        return new Notificacion(mensaje, reserva.alojamiento.anfitrion)
    }

    static notificarConfirmacion(reserva, nombre) {
        const mensaje = `Reserva confirmada en ${nombre} para el día ${new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString('es-AR', {timeZone: 'UTC'})}`;
        return new Notificacion(mensaje, reserva.huespedReservador)
    }

    static notificarCancelacion(reserva, motivo, nombre, anfitrion) {
        const mensaje = `Reserva cancelada en ${nombre} para el día ${new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString('es-AR', {timeZone: 'UTC'})} (Motivo: ${motivo})`;
        return new Notificacion(mensaje, anfitrion)
    }

    static notificarRechazo(reserva, motivo, nombre) {
        const mensaje = `Reserva rechazada en ${nombre} para el día ${new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString('es-AR', {timeZone: 'UTC'})} (Motivo: ${motivo})`;
        return new Notificacion(mensaje, reserva.huespedReservador)
    }

    static notificarModificacion(reserva, nombre, anfitrion) {
        const mensaje = `Reserva modificada de ${reserva.huespedReservador.nombre} en ${nombre} para el día ${new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString('es-AR', {timeZone: 'UTC'})}`;
        return new Notificacion(mensaje, anfitrion)
    }

    static notificarRecordatorioCheckin(reserva) {
        const fecha = reserva.rangoFechas?.fechaInicio?.toLocaleDateString() ?? "próximamente";
        const alojamiento = reserva.alojamiento?.nombre ?? "tu alojamiento";
        const mensaje = `Te recordamos que tu check-in en ${alojamiento} es el día ${fecha}.`;
        return new Notificacion(mensaje, reserva.huespedReservador);
    }

    static notificarRecordatorioCheckout(reserva) {
        const fecha = reserva.rangoFechas?.fechaFin?.toLocaleDateString() ?? "próximamente";
        const alojamiento = reserva.alojamiento?.nombre ?? "tu alojamiento";
        const mensaje = `Te recordamos que tu check-out de ${alojamiento} es el día ${fecha}.`;
        return new Notificacion(mensaje, reserva.huespedReservador);
    }
}

export { FactoryNotificacion };