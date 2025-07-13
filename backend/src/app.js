import express from "express";
import 'express-async-errors';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../docs/swagger.json' with { type: 'json' };
import cors from 'cors';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { Server } from "./server/server.js";
import { ReservaService } from "./services/reservaService.js";
import { UsuarioService } from "./services/usuarioService.js";
import { ReservaController } from "./controller/reservaController.js";
import {UsuarioController} from "./controller/usuarioController.js";
import {AlojamientoService} from "./services/alojamientoService.js";
import {AlojamientoController} from "./controller/alojamientoController.js";
import {UsuarioRepository} from "./models/repositories/usuarioRepository.js";
import {AlojamientoRepository} from "./models/repositories/alojamientoRepository.js";
import {HealthCheckController} from "./controller/healthCheckController.js";
import {ReservaRepository} from "./models/repositories/reservaRepository.js";
import {NotificacionRepository} from "./models/repositories/notificacionRepository.js";
import {CambioEstadoReservaRepository} from "./models/repositories/cambioEstadoReservaRepository.js";
import {NotificacionService} from "./services/notificacionService.js";
import {NotificacionController} from "./controller/notificacionController.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app, port);
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// REPOSITORIOS
const usuarioRepository = new UsuarioRepository();
const alojamientoRepository = new AlojamientoRepository();
const reservaRepository = new ReservaRepository();
const notificacionRepository = new NotificacionRepository();
const cambioEstadoReservaRepository = new CambioEstadoReservaRepository();

// SERVICIOS
const reservaService = new ReservaService(reservaRepository, notificacionRepository, alojamientoRepository, cambioEstadoReservaRepository);
const usuarioService = new UsuarioService(usuarioRepository, reservaRepository, alojamientoRepository);
const alojamientoService = new AlojamientoService(alojamientoRepository, usuarioRepository, reservaRepository);
const notificacionService = new NotificacionService(notificacionRepository, reservaRepository);

// CONTROLADORES
const reservaController = new ReservaController(reservaService, notificacionService);
const usuarioController = new UsuarioController(usuarioService);
const alojamientoController = new AlojamientoController(alojamientoService);
const healthCheckController = new HealthCheckController();
const notificacionController = new NotificacionController(notificacionService);

server.setController(ReservaController, reservaController);
server.setController(UsuarioController, usuarioController);
server.setController(AlojamientoController, alojamientoController);
server.setController(HealthCheckController, healthCheckController);
server.setController(NotificacionController, notificacionController);

server.configureRoutes();

app.use(errorHandler);

export {
    app,
    server,
    notificacionService
};