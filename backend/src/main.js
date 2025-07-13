import { MongoDBClient } from "./config/database.js";
import { server, notificacionService } from './app.js';
import cron from 'node-cron';

await MongoDBClient.connect();

server.launch();

cron.schedule('0 9 * * *', async () => {
    await notificacionService.generarRecordatorios();
});
