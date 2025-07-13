import {AlojamientoModel} from "../schemas/alojamientoSchema.js";

export class AlojamientoRepository {
    constructor() {
        this.model = AlojamientoModel;
    }

    async save(alojamiento) {
        const query = alojamiento.id ? { _id: alojamiento.id } : { _id: new this.model()._id };
        return this.model.findOneAndUpdate(
            query,
            alojamiento,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        ).populate('reservas');
    }

    async findAll(filtros) {
        return this.model.find(filtros);
    }

    async findById(id) {
        return this.model.findById(id, null, null).populate('reservas').populate('anfitrion');
    }

    async findByName(nombre) {
        return this.model.findOne({ nombre: nombre }).populate('reservas').populate('anfitrion');
    }

    async precioPorNoche(id) {
        const alojamiento = await this.model.findById(id, 'precioPorNoche');
        if (!alojamiento) {
            throw new Error(`Alojamiento con ID ${id} no encontrado`);
        }
        return alojamiento.precioPorNoche;
    }

    async findByUserId(idUsuario) {
        return this.model.find({ anfitrion: idUsuario }).populate('reservas').populate('anfitrion');
    }
}