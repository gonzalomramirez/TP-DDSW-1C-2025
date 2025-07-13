import {NotFoundError, ValidationError} from "../errors/AppError.js";

export class NotificacionController {
    constructor(notificacionService) {
        this.notificacionService = notificacionService;
    }

    async findAll (req, res) {
        const notificaciones = await this.notificacionService.findAll();
        res.status(200).json(notificaciones);
    };

    async findById(req, res) {
        const { id } = req.params;
        const notificacion = await this.notificacionService.findById(id);
        if (!notificacion) {
            throw new NotFoundError("Notificacion no encontrada")
        }
        res.status(200).json(notificacion);
    };

    async findByUsuarioId(req, res) {
        const { usuarioId } = req.params;
        const notificaciones = await this.notificacionService.findByUsuarioId(usuarioId);
        if (!notificaciones || notificaciones.length === 0) {
            throw new NotFoundError("No se encontraron notificaciones para el usuario")
        }
        res.status(200).json(notificaciones);
    };

    async findByUsuarioAndLeidas(req, res) {
        const { usuarioId } = req.params;

        if(!usuarioId) {
            throw new ValidationError("El id del usuario es obligatorio");
        }
        const notificaciones = await this.notificacionService.findByUsuarioAndEstado(usuarioId, true);
        if (!notificaciones || notificaciones.length === 0) {
            throw new NotFoundError("No se encontraron notificaciones para el usuario")
        }

        res.status(200).json(notificaciones);
    }

    async findByUsuarioAndUnread(req, res) {
        const { usuarioId } = req.params;

        if(!usuarioId) {
            throw new ValidationError("El id del usuario es obligatorio");
        }
        const notificaciones = await this.notificacionService.findByUsuarioAndEstado(usuarioId, false);
        if (!notificaciones || notificaciones.length === 0) {
            throw new NotFoundError("No se encontraron notificaciones para el usuario")
        }

        res.status(200).json(notificaciones);
    }

    async marcarComoLeida(req, res) {
        const { id } = req.params;
        const notificacion = await this.notificacionService.marcarLeida(id);

        if (!notificacion) {
            return res.status(404).json({ mensaje: "Notificación no encontrada" });
        }

        return res.status(200).json({ mensaje: "Notificación marcada como leída", notificacion });
    }

    async generarRecordatorios(req, res) {
        try {
            await this.notificacionService.generarRecordatorios();
            res.status(200).json({ mensaje: "Recordatorios generados correctamente." });
        } catch (error) {
            console.error("Error generando recordatorios:", error);
            throw new ValidationError("No se pudieron generar los recordatorios.");
        }
    }
}