import mongoose from 'mongoose';
import {Alojamiento} from "../entities/Alojamiento.js";

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    precioPorNoche: {
        type: Number,
        required: true
    },
    moneda: {
        type: String,
        enum: ['DOLAR_USA', 'PESO_ARG', 'REAL'],
        required: false
    },
    horarioCheckIn: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    },
    horarioCheckOut: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    },
    direccion: {
        calle: String,
        altura: Number,
        ciudad: {
            nombre: String,
            pais: {
                nombre: String
            }
        },
        lat: Number,
        long: Number,
    },
    cantidadMaximaHuespedes: {
        type: Number,
        required: true
    },
    caracteristicas: {
        type: [String],
        enum: ['WIFI', 'PISCINA', 'MASCOTAS_PERMITIDAS', 'ESTACIONAMIENTO'],
        required: false
    },
    reservas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva',
        required: false
    }],
    fotos: [{
        type: String,
        required: false
    }],
},{
    timestamps: true,
    collection: 'alojamientos'
})

alojamientoSchema.loadClass(Alojamiento)

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);