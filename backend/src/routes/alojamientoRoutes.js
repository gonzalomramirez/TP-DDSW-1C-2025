export function alojamientoRoutes(app, getController) {
    const controller = getController("AlojamientoController");

    app.post("/alojamientos", (req, res) => controller.create(req, res));

    app.get("/alojamientos", (req, res) => controller.findAll(req, res));

    app.get("/alojamientos/:id/reservas", (req, res) => controller.findReservasPorAlojamientoId(req, res));

    app.get("/alojamientos/:id", (req, res) => controller.findById(req, res));

    app.put("/alojamientos/:id", (req, res) => controller.update(req, res));
}