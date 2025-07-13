import {UsuarioModel} from "../schemas/usuarioSchema.js";

export class UsuarioRepository {
    constructor() {
        this.model = UsuarioModel;
    }

    async findAll(){
        return this.model.find();
    }

    async findById(id) {
        return this.model.findById(id, null, null);
    }

    async save(usuario) {
        const query = usuario.id ? { _id: usuario.id } : { _id: new this.model()._id };
        return this.model.findOneAndUpdate(
            query,
            usuario,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
    }

    async findByEmail(email){
        return await this.model.findOne({email})
    }
}