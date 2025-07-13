import express from "express";
import { configureRoutes } from "../routes/index.js";
import {errorHandler} from "../middlewares/errorHandler.js";

export class Server {
    controllers = {};
    routes = [];

    constructor(app, port = 3000) {
        this.app = app;
        this.port = port;
        this.app.use(express.json());
    }

    setController(controllerClass, controller) {
        this.controllers[controllerClass.name] = controller;
    }

    getController(controllerClass) {
        const controller = this.controllers[controllerClass];
        if (!controller) {
            throw new Error("Controller missing for the given route.");
        }
        return controller;
    }

    configureRoutes() {
        configureRoutes(this.app, this.getController.bind(this));

        this.app.use((req, res, next) => {
            res.status(404).json({
                status: 'fail',
                message: "Route not found"
            });
        });

        this.app.use(errorHandler);
    }

    launch() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    addRoute(route) {
        this.routes.push(route);
    }
}
