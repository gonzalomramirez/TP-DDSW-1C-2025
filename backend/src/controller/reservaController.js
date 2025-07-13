import {ValidationError} from "../errors/AppError.js";

export class ReservaController {
    constructor(reservaService, notificacionService) {
        this.reservaService = reservaService;
    }

    async findAll (req, res) {
        const reservas = await this.reservaService.findAll();

        res.status(200).json(reservas);
    };

    async findById(req, res) {
        const { id } = req.params;
        const reserva = await this.reservaService.findById(id);
        res.status(200).json(reserva);
    }

    async create (req, res) {
        try {
            const nuevaReserva = await this.reservaService.create(req.body);

            res.status(201).json(nuevaReserva);
        }catch (error) {
            res.status(error.statusCode || 500).json({
                message: error.message || "Error inesperado al crear la reserva"
            });
        }
    };

    async confirmar(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ValidationError("Faltan datos");
            }

            await this.reservaService.confirmarReserva(id);

            res.status(200).json({ message: "Reserva confirmada" });
        } catch (error) {
            res.status(error.statusCode || 500).json({
                message: error.message || "Error inesperado al confirmar la reserva",
            });
        }
    }

    async cancelar(req, res) {
        try {
            const { id } = req.params;
            const { motivo } = req.body;

            if (!id) {
                throw new ValidationError("Faltan datos");
            }

            await this.reservaService.cancelarReserva(id, motivo);

            res.status(200).json({ message: "Reserva cancelada" });
        } catch (error) {
            res.status(error.statusCode || 500).json({
                message: error.message || "Error inesperado al cancelar la reserva",
            });
        }
    }


    async modificarReserva (req, res) {
        try {
            const {id} = req.params;
            const {nuevaFechaInicio, nuevaFechaFin} = req.body;

            if (!id || !nuevaFechaInicio || !nuevaFechaFin) {
                throw new ValidationError("Faltan datos");
            }

            if (await this.reservaService.modificarReserva(id, nuevaFechaInicio, nuevaFechaFin)) {
                res.status(200).json({message: "Reserva modificada"});
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({
                message: error.message || "Error inesperado al modificar la reserva",
            });
        }
    }

    async rechazar(req, res) {
        try {
            const { id } = req.params;
            const { motivo } = req.body;

            if (!id) {
                throw new ValidationError("Faltan datos");
            }

            await this.reservaService.rechazarReserva(id, motivo);

            res.status(200).json({ message: "Reserva rechazada" });
        } catch (error) {
            res.status(error.statusCode || 500).json({
                message: error.message || "Error inesperado al rechazar la reserva",
            });
        }
    }
}
