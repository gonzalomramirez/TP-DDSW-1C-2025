import {FactoryNotificacion} from "../models/entities/FactoryNotificacion.js";

export class NotificacionService {
    constructor(notificacionRepository, reservaRepository) {
        this.notificacionRepository = notificacionRepository;
        this.reservaRepository = reservaRepository;
        this.alojamientoRepository
    }

    async findAll() {
        return await this.notificacionRepository.findAll();
    }

    async findById(id) {
        return await this.notificacionRepository.findById(id);
    }

    async findByUsuarioId(usuarioId) {
        return await this.notificacionRepository.findByUsuarioId(usuarioId);
    }

    async findByUsuarioAndEstado(usuarioId, leida) {
        return await this.notificacionRepository.findByUsuarioAndEstado(usuarioId, leida);
    }

    async marcarLeida(id) {
        const notificacion = await this.notificacionRepository.findById(id);

        if (!notificacion) {
            throw new Error('Notificación no encontrada');
        }

        await notificacion.marcarComoLeida()

        return await this.notificacionRepository.save(notificacion);
    }

    async generarRecordatorios() {
        const hoy = new Date();
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1);

        const reservas = await this.reservaRepository.findByEstado("CONFIRMADA");

        for (const reserva of reservas) {
            if (!reserva.rangoFechas) continue;

            const { fechaInicio, fechaFin } = reserva.rangoFechas;

            if (this.esMismoDia(fechaInicio, manana)) {
                const notificacion = FactoryNotificacion.notificarRecordatorioCheckin(reserva);
                await this.notificacionRepository.save(notificacion);
            }

            if (this.esMismoDia(fechaFin, manana)) {
                const notificacion = FactoryNotificacion.notificarRecordatorioCheckout(reserva);
                await this.notificacionRepository.save(notificacion);
            }
        }
    }

    esMismoDia(fechaA, fechaB) {
        const fA = new Date(fechaA);
        const fB = new Date(fechaB);
        return (
            fA.getFullYear() === fB.getFullYear() &&
            fA.getMonth() === fB.getMonth() &&
            fA.getDate() === fB.getDate()
        );
    }


}