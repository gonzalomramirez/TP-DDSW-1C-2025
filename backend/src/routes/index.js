import {reservaRoutes} from "./reservaRoutes.js";
import {usuarioRoutes} from "./usuarioRoutes.js";
import {alojamientoRoutes} from "./alojamientoRoutes.js";
import {healthCheckRoutes} from "./healthCheckRoutes.js";
import {notificacionRoutes} from "./notificacionRoutes.js";

export function configureRoutes(app, getController) {
    reservaRoutes(app, getController.bind(this));
    usuarioRoutes(app, getController.bind(this));
    alojamientoRoutes(app, getController.bind(this));
    healthCheckRoutes(app, getController.bind(this));
    notificacionRoutes(app, getController.bind(this));
}