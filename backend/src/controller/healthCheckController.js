export class HealthCheckController {
    healthCheck(req, res) {
        res.status(200).json({ response: "Server OK!" });
    }
}