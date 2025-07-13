import {Usuario} from "../models/entities/Usuario.js";
import {AlreadyExistsError, ValidationError} from "../errors/AppError.js";

export class UsuarioService {
    constructor(usuarioRepository, reservaRepository, alojamientoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.reservaRepository = reservaRepository;
        this.alojamientoRepository = alojamientoRepository;
    }

    async findAll() {
        return await this.usuarioRepository.findAll()
    }

    async findById(id) {
        return await this.usuarioRepository.findById(id);
    }

    async create(usuario) {
        const {tipo, nombre, email} = usuario;

        if (!nombre || !email) {
            throw new ValidationError("Nombre y/o email son requeridos");
        }

        if (await this.usuarioRepository.findByEmail(email)) {
            throw new AlreadyExistsError("Ya existe un usuario con ese mail")
        }

        const nuevoUsuario = new Usuario(tipo, nombre, email);

        return await this.usuarioRepository.save(nuevoUsuario)
    }

    async reservasPorUsuario(idUsuario) {
        if(await this.usuarioRepository.findById(idUsuario) === null) {
            throw new ValidationError("El usuario no existe");
        }

        return this.reservaRepository.findByUser(idUsuario);
    }

    async alojamientosPorUsuario(idUsuario) {
        return await this.alojamientoRepository.findByUserId(idUsuario)
    }

    async login(email) {

        const usuario = await this.usuarioRepository.findByEmail(email);
        if (!usuario) throw new ValidationError("Usuario no encontrado");

        return {
            id: usuario._id,
            nombre: usuario.nombre,
            tipo: usuario.tipo,
            email: usuario.email
        };
    }
}