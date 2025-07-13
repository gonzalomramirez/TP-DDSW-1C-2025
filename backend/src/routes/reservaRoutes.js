import {ReservaController} from "../controller/reservaController.js";

export function reservaRoutes(app, getController) {

    const controller = getController("ReservaController");

    app.get("/reservas", (req, res) => {
        controller.findAll(req, res);
    });

    app.get("/reservas/:id", (req, res) => {
        controller.findById(req, res);
    });

    app.post("/reservas", (req, res) => {
        controller.create(req, res);
    });

    app.put("/reservas/:id/confirmar", (req, res) => {
        controller.confirmar(req, res);
    });

    app.put("/reservas/:id/cancelar", (req, res) => {
        controller.cancelar(req, res);
    });

    app.put("/reservas/:id/rechazar", (req, res) => {
        controller.rechazar(req, res);
    });

    app.put("/reservas/:id/modificar", (req, res) => {
        controller.modificarReserva(req, res);
    })
}