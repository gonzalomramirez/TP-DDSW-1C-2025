import { NotFoundError, ValidationError, AlreadyExistsError, ConflictError } from '../errors/AppError.js';
import { RangoFecha } from '../models/entities/RangoFecha.js';
import { Reserva } from '../models/entities/Reserva.js';
import { CambioEstadoReserva } from '../models/entities/CambioEstadoReserva.js';
import {
    FactoryNotificacion as NotificacionFactory,
    FactoryNotificacion
} from '../models/entities/FactoryNotificacion.js';

export class ReservaService {
    constructor(reservaRepository, notificacionRepository, alojamientoRepository, cambioEstadoReservaRepository) {
        this.reservaRepository = reservaRepository;
        this.notificacionRepository = notificacionRepository;
        this.alojamientoRepository = alojamientoRepository;
        this.cambioEstadoReservaRepository = cambioEstadoReservaRepository;
    }

    async findAll() {
        return await this.reservaRepository.findAll();
    }

    async findById(id) {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva) throw new NotFoundError("Reserva no encontrada");
        return reserva;
    }

    async create(reserva) {
        const { huespedReservadorId, cantHuespedes, alojamientoId, fechaInicio, fechaFin } = reserva;

        if (!huespedReservadorId) {
            throw new ValidationError("Inicia sesión para generar una reserva");
        }

        if (!cantHuespedes || !alojamientoId || !fechaInicio || !fechaFin) {
            throw new ValidationError("Faltan datos para crear la reserva");
        }

        const rangoFecha = new RangoFecha(fechaInicio, fechaFin);

        const alojamiento = await this.alojamientoRepository.findById(alojamientoId);
        if (!alojamiento) throw new NotFoundError("Alojamiento no encontrado");

        await this.reservaRepository.verificarDisponibilidad(alojamientoId, rangoFecha);

        if( cantHuespedes > alojamiento.cantidadMaximaHuespedes ) {
            throw new ValidationError("La cantidad maxima de huespeds es " + alojamiento.cantidadMaximaHuespedes);
        }

        const yaExiste = await this.reservaRepository.findReservaExistente(huespedReservadorId, alojamientoId, rangoFecha);
        if (yaExiste) throw new AlreadyExistsError("La reserva ya fue realizada");

        const nuevaReserva = new Reserva(
            huespedReservadorId,
            cantHuespedes,
            alojamientoId,
            rangoFecha,
            await this.alojamientoRepository.precioPorNoche(alojamientoId)
        );

        const reservaGuardada = await this.reservaRepository.save(nuevaReserva);

        alojamiento.agregarReserva(reservaGuardada._id);
        await this.alojamientoRepository.save(alojamiento);

        if (reservaGuardada) {
            await this.notificacionRepository.save(NotificacionFactory.crearSegunReserva(reservaGuardada, alojamiento.nombre))
        }

        return reservaGuardada;
    }

    async confirmarReserva(reservaId) {
        const reserva = await this.findById(reservaId);

        if (new Date(reserva.rangoFechas.fechaInicio) <= new Date()) {
            throw new ValidationError("La reserva ya está vencida");
        }

        reserva.confirmar();

        const reservaActualizada = await this.reservaRepository.save(reserva);

        await this.cambioEstadoReservaRepository.save(new CambioEstadoReserva(reserva, null));

        const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);

        await this.notificacionRepository.save(FactoryNotificacion.notificarConfirmacion(reserva, alojamiento.nombre));

        return reservaActualizada;
    }

    async cancelarReserva(reservaId, motivo) {
        const reserva = await this.findById(reservaId);

        if (new Date(reserva.rangoFechas.fechaInicio) <= new Date() && reserva.estado === 'CONFIRMADA') {
            throw new ValidationError("No se puede cancelar una reserva ya iniciada");
        }

        reserva.cancelar();

        const reservaCancelada = await this.reservaRepository.save(reserva);

        await this.cambioEstadoReservaRepository.save(new CambioEstadoReserva(reserva, motivo));

        const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);

        await this.notificacionRepository.save(FactoryNotificacion.notificarCancelacion(reserva, motivo, alojamiento.nombre, alojamiento.anfitrion));

        return reservaCancelada;
    }

    async modificarReserva(reservaId, nuevaFechaInicio, nuevaFechaFin) {
        const reserva = await this.findById(reservaId);

        if (reserva.estado === 'CANCELADA') {
            throw new ConflictError("No se puede modificar una reserva cancelada");
        }

        const rangoNuevo = new RangoFecha(nuevaFechaInicio, nuevaFechaFin);

        await this.reservaRepository.verificarDisponibilidad(reserva.alojamiento, rangoNuevo, reservaId);

        reserva.actualizarRangoFechas(rangoNuevo);

        if (reserva.estado === 'CONFIRMADA') {
            reserva.estado = 'PENDIENTE';

            await this.cambioEstadoReservaRepository.save(
                new CambioEstadoReserva({
                    reserva: reserva.id,
                    estado: 'PENDIENTE',
                    usuario: reserva.huespedReservador,
                    motivo: 'Modificación de fechas: requiere nueva confirmación'
                })
            );
        }

        const reservaActualizada = await this.reservaRepository.save(reserva);

        await this.cambioEstadoReservaRepository.save(new CambioEstadoReserva(reserva, null));

        const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);

        await this.notificacionRepository.save(FactoryNotificacion.notificarModificacion(reserva, alojamiento.nombre, alojamiento.anfitrion));

        return reservaActualizada;
    }

    async rechazarReserva(reservaId, motivo) {
        const reserva = await this.findById(reservaId);

        reserva.rechazar();

        const reservaRechazada = await this.reservaRepository.save(reserva);

        await this.cambioEstadoReservaRepository.save(new CambioEstadoReserva(reservaRechazada, motivo));

        const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);

        await this.notificacionRepository.save(FactoryNotificacion.notificarRechazo(reserva, motivo, alojamiento.nombre, reservaRechazada.huespedReservador));

        return reservaRechazada;
    }
}