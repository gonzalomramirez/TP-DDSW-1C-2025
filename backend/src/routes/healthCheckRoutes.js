export function healthCheckRoutes(app, getController) {
    const controller = getController("HealthCheckController");

    app.get("/healthcheck", (req, res) => controller.healthCheck(req, res));
}