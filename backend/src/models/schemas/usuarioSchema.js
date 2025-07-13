import mongoose from 'mongoose';
import {Usuario} from "../entities/Usuario.js";

const usuarioSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['HUESPED', 'ANFITRION'],
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    collection: 'usuarios'
})

usuarioSchema.loadClass(Usuario)

export const UsuarioModel = mongoose.model('Usuario', usuarioSchema);