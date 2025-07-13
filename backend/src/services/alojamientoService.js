import {Alojamiento} from "../models/entities/Alojamiento.js";
import {Direccion} from "../models/entities/Direccion.js";
import {Pais} from "../models/entities/Pais.js";
import {Ciudad} from "../models/entities/Ciudad.js";
import {AlreadyExistsError, ValidationError} from "../errors/AppError.js";
import {FiltroService} from "./filtroService.js";

export class AlojamientoService {
    constructor(alojamientoRepository, usuarioRepository, reservaRepository) {
        this.alojamientoRepository = alojamientoRepository;
        this.usuarioRepository = usuarioRepository;
        this.reservaRepository = reservaRepository;
    }

    async findById(id) {
        const alojamiento = await this.alojamientoRepository.findById(id);
        if (!alojamiento) {
            throw new ValidationError(`Alojamiento con ID ${id} no encontrado`);
        }
        return alojamiento;
    }

    async findAll(queryParams, page, pageSize) {
        const filtros = await FiltroService.construirFiltros(queryParams);
        let alojamientos = await this.alojamientoRepository.findAll(filtros);

        const { fechaCheckIn, fechaCheckOut } = queryParams;
        alojamientos = await FiltroService.filtrarPorDisponibilidad(alojamientos, fechaCheckIn, fechaCheckOut, this.reservaRepository);

        const { minPrecio, maxPrecio, moneda } = queryParams;
        const alojamientosFiltrados = await FiltroService.filtrarPorPrecioEnPesos(alojamientos, minPrecio, maxPrecio, moneda);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return alojamientosFiltrados.slice(startIndex, endIndex);
    }

    async create(alojamiento) {
        const {anfitrion, nombre, descripcion, precioPorNoche, moneda,
               horarioCheckIn, horarioCheckOut, calle, altura, nombreCiudad,
               nombrePais, latitud, longitud, cantidadMaximaHuespedes, caracteristicas,
               fotos} = alojamiento;

        if (!anfitrion || !nombre || !precioPorNoche || !horarioCheckIn || !horarioCheckOut || !cantidadMaximaHuespedes
            || !calle || !nombreCiudad || !nombrePais) {
            throw new ValidationError("Faltan datos obligatorios para crear el alojamiento");
        }

        const pais = new Pais(nombrePais);
        const ciudad = new Ciudad(nombreCiudad, pais);
        const direccion = new Direccion(calle, altura, ciudad, latitud, longitud);

        if (await this.alojamientoRepository.findByName(nombre)) {
            throw new AlreadyExistsError(`Ya existe un alojamiento con el nombre ${nombre}`);
        }

        const usuario = await this.usuarioRepository.findById(anfitrion);

        if (!usuario.esAnfitrion()) {
            throw new ValidationError('El usuario no es un anfitrión');
        }

        return await this.alojamientoRepository.save(new Alojamiento(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantidadMaximaHuespedes, caracteristicas, fotos));
    }

    async findReservasPorAlojamientoId(idReserva) {
        return await this.reservaRepository.findByAlojamientoId(idReserva);
    }

    async update(alojamiento, id) {
        const {
            nombre,
            descripcion,
            precioPorNoche,
            moneda,
            horarioCheckIn,
            horarioCheckOut,
            calle,
            altura,
            nombreCiudad,
            nombrePais,
            latitud,
            longitud,
            cantidadMaximaHuespedes,
            caracteristicas,
            fotos
        } = alojamiento;


        const pais = new Pais(nombrePais);
        const ciudad = new Ciudad(nombreCiudad, pais);
        const direccion = new Direccion(calle, altura, ciudad, latitud, longitud);

        const alojamientoExistente = await this.alojamientoRepository.findById(id);

        if (!alojamientoExistente) {
            throw new ValidationError("No se encontró el alojamiento a modificar");
        }

        alojamientoExistente.nombre = nombre;
        alojamientoExistente.descripcion = descripcion;
        alojamientoExistente.precioPorNoche = precioPorNoche;
        alojamientoExistente.moneda = moneda;
        alojamientoExistente.horarioCheckIn = horarioCheckIn;
        alojamientoExistente.horarioCheckOut = horarioCheckOut;
        alojamientoExistente.direccion = direccion;
        alojamientoExistente.cantidadMaximaHuespedes = cantidadMaximaHuespedes;
        alojamientoExistente.caracteristicas = caracteristicas;
        alojamientoExistente.fotos = fotos;

        return await this.alojamientoRepository.save(alojamientoExistente);
    }
}