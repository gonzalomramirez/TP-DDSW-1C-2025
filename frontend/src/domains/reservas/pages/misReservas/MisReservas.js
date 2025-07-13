import React, { useEffect, useState } from 'react';
import { obtenerReservasDelUsuario } from '../../../usuarios/services/UsuarioService';
import ReservaCardHuesped from '../../components/reservaCard/huesped/ReservaCardHuesped';
import './MisReservas.css';
import { Alert, Typography } from '@mui/material';
import {useParams} from "react-router-dom";

const MisReservas = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const cargarReservas = async () => {
            try {
                const data = await obtenerReservasDelUsuario(id);
                setReservas(data);
                setError(null);
            } catch (err) {
                setError('No se pudieron cargar tus reservas.');
            }
        };

        if (id) {
            cargarReservas();
        }
    }, [id]);

    return (
        <div className="mis-reservas-container">
            <Typography variant="h4" sx={{ mb: 2 }}> Mis Reservas </Typography>

            {error && ( <Alert severity="error" sx={{ mb: 2 }}> {error} </Alert>)}

            <div className="reservas-grid">
                {reservas.length === 0 ? (
                    <Typography variant="body1">No tenés reservas aún.</Typography>
                ) : (
                    reservas.map((reserva) => (
                        <ReservaCardHuesped reserva={reserva}/>
                    ))
                )}
            </div>
        </div>
    );
};

export default MisReservas;