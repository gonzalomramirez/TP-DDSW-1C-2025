import mongoose from "mongoose";
import {CambioEstadoReserva} from "../entities/CambioEstadoReserva.js";

const cambioEstadoReservaSchema = new mongoose.Schema({
    reserva: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva',
        required: true
    },
    motivo: {
        type: String,
        required: false
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
        required: true
    }
}, {
    timestamps: true,
    collection: 'cambioReservas'
    }
)

cambioEstadoReservaSchema.loadClass(CambioEstadoReserva)

export const CambioEstadoReservaModel = mongoose.model('CambioEstadoReserva', cambioEstadoReservaSchema);