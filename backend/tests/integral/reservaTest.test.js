import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../../src/app.js';
import {afterAll, afterEach, beforeAll, describe, expect, it} from "@jest/globals"; // limpio, sin levantar servidor

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const dbName = mongoose.connection.name;
    if (dbName !== 'birbnb') {
        await mongoose.connection.db.dropDatabase();
    }
})

describe('POST /reservas', () => {
    it('debería crear una reserva y generar una notificación', async () => {
        const usuarioRes = await request(app).post('/usuarios').send({
            nombre: 'Carlos',
            email: 'carlos@birbnb.com',
            tipo: 'HUESPED'
        });
        const usuarioId = usuarioRes.body._id;

        const anfitrionRes = await request(app).post('/usuarios').send({
            nombre: 'Anfitrión',
            email: 'anfitrion@birbnb.com',
            tipo: 'ANFITRION'
        });

        const anfitrionId = anfitrionRes.body._id;

        const alojamientoRes = await request(app).post('/alojamientos').send({
            anfitrion: anfitrionId,
            nombre: 'Casa del Lago',
            descripcion: 'Hermosa vista y tranquilidad',
            precioPorNoche: 10000,
            moneda: 'PESO_ARG',
            horarioCheckIn: '14:00',
            horarioCheckOut: '11:00',
            calle: 'Mitre',
            altura: 123,
            nombreCiudad: 'Bariloche',
            nombrePais: 'Argentina',
            lat: -41.13,
            long: -71.31,
            cantidadMaximaHuespedes: 4,
            caracteristicas: ['WIFI'],
            fotos: ['http://imagen.jpg']
        });

        const alojamientoId = alojamientoRes.body._id;

        const reservaRes = await request(app).post('/reservas').send({
            huespedReservadorId: usuarioId,
            alojamientoId,
            fechaInicio: '2025-08-01',
            fechaFin: '2025-08-05',
            cantHuespedes: 1
        });

        expect(reservaRes.statusCode).toBe(201);
        expect(reservaRes.body.estado).toBe('PENDIENTE');
        expect(reservaRes.body.huespedReservador._id).toBe(usuarioId);
        expect(reservaRes.body.alojamiento._id).toBe(alojamientoId);

        const notificaciones = await request(app).get(`/usuarios/${anfitrionId}/notificaciones`);
        expect(notificaciones.statusCode).toBe(200);
        expect(notificaciones.body.length).toBeGreaterThan(0);
        expect(notificaciones.body[0].mensaje).toMatch(/Carlos.*Casa del Lago/);
    });
});
