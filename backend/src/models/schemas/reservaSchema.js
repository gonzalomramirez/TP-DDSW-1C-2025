import mongoose from 'mongoose';
import {Reserva} from "../entities/Reserva.js";

const reservaSchema = new mongoose.Schema({
    huespedReservador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cantHuespedes: {
        type: Number,
        required: true
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alojamiento',
        required: true
    },
    rangoFechas: {
        fechaInicio: {
            type: Date,
            required: true
        },
        fechaFin: {
            type: Date,
            required: true
        }
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
        default: 'PENDIENTE'
    },
    precioPorNoche: {
        type: Number,
        required: true
    }
},{
    timestamps: true,
    collection: 'reservas'
})

reservaSchema.loadClass(Reserva)

export const ReservaModel = mongoose.model('Reserva', reservaSchema);