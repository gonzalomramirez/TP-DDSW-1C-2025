import {NotificacionModel} from "../schemas/notificacionSchema.js";

export class NotificacionRepository {
    constructor() {
        this.model = NotificacionModel
    }

    async findAll(){
        return this.model.find();
    }

    async findById(id) {
        return this.model.findById(id, null, null);
    }

    async findByUsuarioId(usuarioId) {
        return this.model.find({ usuario: usuarioId }, null, null);
    }

    async save(notificacion) {
        const query = notificacion.id ? { _id: notificacion.id } : { _id: new this.model()._id };
        return this.model.findOneAndUpdate(
            query,
            notificacion,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        ).populate('usuario')
    }

    async findById(id) {
        return this.model.findById(id);
    }

    async findByUsuarioAndEstado(usuarioId, leida) {
        return this.model.find({ usuario: usuarioId, leida });
    }
}