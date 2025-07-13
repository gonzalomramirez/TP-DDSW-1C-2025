import {CambioEstadoReservaModel} from "../schemas/cambioEstadoReservaSchema.js";

export class CambioEstadoReservaRepository {
    constructor() {
        this.model = CambioEstadoReservaModel;
    }

    async save(cambioEstadoReserva) {
        const query = cambioEstadoReserva.id ? { _id: cambioEstadoReserva.id } : { _id: new this.model()._id };
        return this.model.findOneAndUpdate(
            query,
            cambioEstadoReserva,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        ).populate('reserva').populate('usuario');
    }

    async findAll() {
        return this.model.find();
    }

    async findById(id) {
        return this.model.findById(id, null, null).populate('reservas').populate('usuarios');
    }
}