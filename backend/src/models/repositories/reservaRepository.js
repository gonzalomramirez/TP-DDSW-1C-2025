import {ReservaModel} from "../schemas/reservaSchema.js";
import {ConflictError} from "../../errors/AppError.js";

export class ReservaRepository {
    constructor() {
        this.model = ReservaModel
    }

    async findAll(){
        return this.model.find();
    }

    async save(reserva) {
        const query = reserva.id ? { _id: reserva.id } : { _id: new this.model()._id };
        return this.model.findOneAndUpdate(
            query,
            reserva,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        ).populate('huespedReservador').populate('alojamiento')
    }

    async findById(id) {
        return this.model.findById(id, null, null).populate('huespedReservador');
    }

    async findReservaExistente(huespedReservadorId, alojamientoId, rangoFecha) {
        return this.model.findOne({
            huespedReservador: huespedReservadorId,
            alojamiento: alojamientoId,
            'rangoFechas.fechaInicio': rangoFecha.fechaInicio,
            'rangoFechas.fechaFin': rangoFecha.fechaFin
        });
    }

    async obtenerReservaSolapada(alojamientoId, rangoFecha) {
        return this.model.findOne({
            'alojamiento': alojamientoId,
            'estado': 'CONFIRMADA',
            'rangoFechas.fechaInicio': { $lt: rangoFecha.fechaFin },
            'rangoFechas.fechaFin': { $gt: rangoFecha.fechaInicio }
        });
    }

    async findByUser(idUsuario) {
        return this.model.find({ huespedReservador: idUsuario })
            .sort({ "rangoFechas.fechaInicio": -1 })
            .populate("alojamiento")
            .populate("huespedReservador");
    }

    async verificarDisponibilidad(alojamientoId, rangoFecha, reservaIdAExcluir = null) {
        const query = {
            alojamiento: alojamientoId,
            estado: 'CONFIRMADA',
            'rangoFechas.fechaInicio': { $lte: rangoFecha.fechaFin },
            'rangoFechas.fechaFin': { $gte: rangoFecha.fechaInicio }
        };

        if (reservaIdAExcluir) {
            query._id = { $ne: reservaIdAExcluir };
        }

        const solapada = await this.model.findOne(query);

        if (solapada) {
            const desde = solapada.rangoFechas.fechaInicio.toISOString().split("T")[0];
            const hasta = solapada.rangoFechas.fechaFin.toISOString().split("T")[0];

            throw new ConflictError("El alojamiento ya está reservado entre las fechas " + desde + " y " + hasta);
        }
    }

    async findByAlojamientoId(alojamientoId) {
        return this.model.find({ alojamiento: alojamientoId })
            .sort({ "rangoFechas.fechaInicio": 1 }) // opcional: ordeno por fecha de inicio ascendente
            .populate("alojamiento")
            .populate("huespedReservador");
    }

    async findByEstado(estado) {
        return this.model.find({ estado })
            .populate("alojamiento")
            .populate("huespedReservador");
    }

}