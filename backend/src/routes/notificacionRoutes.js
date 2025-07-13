import {NotificacionController} from "../controller/notificacionController.js";

export function notificacionRoutes(app, getController) {

    const controller = getController("NotificacionController");

    app.get("/notificaciones", (req, res) => {
        controller.findAll(req, res);
    })

    app.get("/notificaciones/:id", (req, res) => {
        controller.findById(req, res);
    })

    app.get("/usuarios/:usuarioId/notificaciones", (req, res) => {
        controller.findByUsuarioId(req, res);
    })

    app.get("/usuarios/:usuarioId/notificaciones/leidas", (req, res) => {
        return controller.findByUsuarioAndLeidas(req, res);
    })

    app.get("/usuarios/:usuarioId/notificaciones/sin-leer", (req, res) => {
        return controller.findByUsuarioAndUnread(req, res);
    })

    app.put("/notificaciones/:id/marcar-leida", (req, res) => {
        controller.marcarComoLeida(req, res);
    });

    app.get("/notificaciones/recordatorios", (req, res) => {
        controller.generarRecordatorios(req, res);
    });
}