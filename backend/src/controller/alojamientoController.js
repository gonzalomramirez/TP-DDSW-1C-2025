export class AlojamientoController {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    async findById(req, res) {
        const id = req.params.id;
        const alojamiento = await this.alojamientoService.findById(id);

        if (!alojamiento) {
            return res.status(404).json({ message: "Alojamiento no encontrado" });
        }

        res.status(200).json(alojamiento);
    }

    async findAll (req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const alojamientos = await this.alojamientoService.findAll(req.query, page, pageSize);

        res.status(200).json(alojamientos);
    };

    async create(req, res) {
        const nuevoAlojamiento = await this.alojamientoService.create(req.body);

        res.status(201).json(nuevoAlojamiento);
    };

    async findReservasPorAlojamientoId(req, res) {
        const id = req.params.id;
        const reservas = await this.alojamientoService.findReservasPorAlojamientoId(id);

        res.status(200).json(reservas);
    };

    async update(req, res) {
        const id = req.params.id;
        const modificacionAlojamiento = req.body;
        const update = await this.alojamientoService.update(modificacionAlojamiento, id);

        res.status(200).json(update);
    }
}