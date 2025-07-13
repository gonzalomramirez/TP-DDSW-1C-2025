import React, { useState, useEffect } from 'react';
import './FormularioReservaModal.css';
import { useAuth } from "../../../../shared/context/AuthContext";
import { crearReserva, modificarReserva } from "../../services/reservaService";
import {Alert, Box, Modal} from '@mui/material';
import ModalReservaConfirmada from "../reservaCard/card/reservaConfirmadaModal/ReservaConfirmadaModal";

const FormularioReservaModal = ({ isOpen, onClose, alojamiento, reservaOriginal }) => {
    const { usuario } = useAuth();
    const [cantidadHuespedes, setCantidadHuespedes] = useState(1);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [costoTotal, setCostoTotal] = useState(0);
    const [error, setError] = useState('');
    const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

    useEffect(() => {
        if (fechaInicio && fechaFin) {
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);
            const diffTime = fin - inicio;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 0) {
                setCostoTotal(diffDays * alojamiento.precioPorNoche);
            } else {
                setCostoTotal(0);
            }
        }
    }, [fechaInicio, fechaFin, alojamiento]);

    useEffect(() => {
        if (reservaOriginal) {
            setCantidadHuespedes(reservaOriginal.cantHuespedes);
            setFechaInicio(new Date(reservaOriginal.rangoFechas.fechaInicio).toISOString().slice(0, 10));
            setFechaFin(new Date(reservaOriginal.rangoFechas.fechaFin).toISOString().slice(0, 10));
        } else {
            setCantidadHuespedes(1);
            setFechaInicio('');
            setFechaFin('');
        }
    }, [reservaOriginal]);

    const resetForm = () => {
        setCantidadHuespedes(1);
        setFechaInicio('');
        setFechaFin('');
        setError('');
        setCostoTotal(0);
        setMostrarModalConfirmacion(false);
    };

    const handleReservar = async () => {
        const reserva = {
            _id: reservaOriginal ? reservaOriginal._id : null,
            huespedReservadorId: usuario ? usuario.id : null,
            cantHuespedes: cantidadHuespedes,
            alojamientoId: alojamiento._id,
            fechaInicio,
            fechaFin,
        };

        try {
            if (reservaOriginal) {
                await modificarReserva(reserva._id, fechaInicio, fechaFin);
                onClose();
            } else {
                const respuesta = await crearReserva(reserva);
                if (respuesta.status === 201) {
                    setMostrarModalConfirmacion(true);
                    setTimeout(() => {
                        onClose();
                        resetForm();
                    }, 2000);
                }
            }
        } catch (error) {
            const mensaje = error.response?.data?.message
            setError(mensaje);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal open={isOpen} onClose={onClose} className="modal-div" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
            <Box className="modal-contenido">
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <h2>Reservar {alojamiento.nombre}</h2>
                <div className="input">
                    <label>Fecha de Inicio:</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                </div>
                <div className="input">
                    <label>Fecha de Fin:</label>
                    <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                </div>
                <div className="input">
                    <label>Cantidad de Huéspedes:</label>
                    <input type="number" min="1" max={alojamiento.cantidadMaximaHuespedes} value={cantidadHuespedes} onChange={(e) => setCantidadHuespedes(parseInt(e.target.value))} />
                </div>

                <div className="total">
                    <strong>Total: </strong> {costoTotal > 0 ? `${alojamiento.moneda} ${costoTotal}` : '-'}
                </div>

                <div className="botones">
                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                    <button className="btn-reservar" onClick={handleReservar}>Reservar</button>
                </div>

                <ModalReservaConfirmada open={mostrarModalConfirmacion} />
            </Box>
        </Modal>
    );
};

export default FormularioReservaModal;