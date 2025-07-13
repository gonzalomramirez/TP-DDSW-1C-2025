import React, { useEffect } from 'react';
import { Modal, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import './ListarReservasModal.css';
import {useReservaContext} from "../../../../shared/context/ReservasContext";
import {useFormAlojamientoContext} from "../../../../shared/context/FormAlojamientoContext";
import {ReservaCardAnfitrion} from "../reservaCard/anfitrion/ReservaCardAnfitrion";

export const ListarReservasModal = ({ isOpen, onClose }) => {
    const { formData: alojamiento } = useFormAlojamientoContext();
    const {reservas, loading, fetchReservasPorAlojamiento, errorMensaje} = useReservaContext();

    useEffect(() => {
        if (isOpen && alojamiento?._id) {
            fetchReservasPorAlojamiento(alojamiento._id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, alojamiento?._id]);

    if (!isOpen) return null;

    return (
        <Modal open={isOpen} onClose={onClose} className="modal-reservas"
               onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}
               BackdropProps={{sx:{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}}
        >
            <Box className="contenido-modal">
                {errorMensaje && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {errorMensaje}
                    </Alert>
                )}
                <Typography variant="h6" className="titulo-modal">
                    Reservas del alojamiento
                </Typography>

                <div className="lista-reservas">
                    {loading ? (
                        <div className="cargando">
                            <CircularProgress />
                            <Typography>Cargando reservas...</Typography>
                        </div>
                    ) : reservas.length === 0 ? (
                        <Typography>No hay reservas aún.</Typography>
                    ) : (
                        reservas.map((reserva) => (
                            <ReservaCardAnfitrion reserva={reserva}/>
                        ))
                    )}
                </div>

                <div className="botonera-modal">
                    <Button variant="outlined" onClick={onClose}>
                        Cerrar
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};