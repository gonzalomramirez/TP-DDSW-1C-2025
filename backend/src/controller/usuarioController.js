export class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }

    async findAll (req, res) {
            const reservas = await this.usuarioService.findAll();
            res.json(reservas);
    };

    async create(req, res) {

            const nuevaReserva = await this.usuarioService.create(req.body);
            res.status(201).json(nuevaReserva);
    };

    reservasUsuario = async (req, res) => {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "Falta el id del usuario" });
            }

            const historial = await this.usuarioService.reservasPorUsuario(id);

            res.status(200).json(historial);
    };

    async alojamientosUsuario(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Falta el id del usuario" });
        }

        const alojamientos = await this.usuarioService.alojamientosPorUsuario(id);

        res.status(200).json(alojamientos);
    }

    async login(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email es obligatorio" });
        }

        const usuario = await this.usuarioService.login(email);

        if (!usuario) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        res.status(200).json(usuario);
    }

}