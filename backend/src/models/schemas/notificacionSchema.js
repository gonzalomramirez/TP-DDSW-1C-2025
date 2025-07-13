import mongoose from "mongoose";
import {Notificacion} from "../entities/Notificacion.js";

const notificacionSchema = new mongoose.Schema({
        mensaje: {
            type: String,
            required: true
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        leida: {
            type: Boolean,
        },
        fechaLeida: {
            type: Date,
            required: false
        }
    }, {
        timestamps: true,
        collection: 'notificaciones'
    }
)

notificacionSchema.loadClass(Notificacion)

export const NotificacionModel = mongoose.model('NotificacionReserva', notificacionSchema);