export function usuarioRoutes(app, getController) {
    const controller = getController("UsuarioController");

    app.post("/usuarios", (req, res) => controller.create(req, res));

    app.get("/usuarios", (req, res) => controller.findAll(req, res));

    app.get("/usuarios/:id/reservas", (req, res) => controller.reservasUsuario(req, res));

    app.get("/usuarios/:id/alojamientos", (req, res) => controller.alojamientosUsuario(req, res));

    app.post("/usuarios/login", (req, res) => controller.login(req, res));
}
