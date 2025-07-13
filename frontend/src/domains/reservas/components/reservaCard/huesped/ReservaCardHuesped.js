import React, {useState} from 'react';
import {Card, CardMedia, CardContent, Typography, Box, Stack} from '@mui/material';
import './ReservaCardHuesped.css';
import {useNavigate} from "react-router-dom";
import {redirigirADetalle} from "../../../../alojamientos/services/alojamientoService";
import {ReservaCard} from "../card/ReservaCard";
import {BotonCancelar} from "../botones/BotonCancelar";
import {BotonModificar} from "../botones/BotonModificar";
import {BotonMotivoCancelacion} from "../botones/BotonMotivoCancelacion";
import FormularioReservaModal from "../../formularioReservaModal/FormularioReservaModal";
import {simboloMoneda} from "../../../../../shared/data/constantes";

const ReservaCardHuesped = ({ reserva }) => {
    const alojamiento = reserva.alojamiento;
    const navigate = useNavigate();
    const [mostrarMotivo, setMostrarMotivo] = useState(false);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    const handleModificar = (reserva) => {
        setReservaSeleccionada(reserva);
        setModalAbierto(true);
    };

    return (
        <>
            <Card className="reserva-card" onClick={() => redirigirADetalle(navigate, reserva.alojamiento._id)} sx={{ cursor: 'pointer' }}>
                <CardMedia component="img" height="140" image={alojamiento.fotos[0]} alt={alojamiento.nombre}/>
                <CardContent>
                    <Typography variant="h6">{alojamiento.nombre}</Typography>

                    <Typography variant="body2" color="text.secondary"> {alojamiento.direccion.ciudad.nombre}, {alojamiento.direccion.ciudad.pais.nombre} </Typography>

                    <ReservaCard reserva={reserva} huesped={true}/>

                    {reserva.estado !== 'CANCELADA' && (

                        <Box className="acciones-reserva">

                            {(reserva.estado === "PENDIENTE" && (!mostrarMotivo ?
                                (
                                    <Stack direction={{ xs: "column", sm:"row" }} spacing={2}>
                                        <BotonModificar reserva={reserva} onModificar={handleModificar} />

                                        <BotonCancelar setMostrarMotivo={setMostrarMotivo} anfitrion={false}/>
                                    </Stack>
                                ) : (
                                    <BotonMotivoCancelacion reserva={reserva} setMostrarMotivo={setMostrarMotivo} anfitrion={false}/>
                                ))
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>

            {modalAbierto && reservaSeleccionada && (
                <FormularioReservaModal
                    isOpen={modalAbierto}
                    onClose={() => {
                        setModalAbierto(false);
                        window.location.reload();
                    }}
                    alojamiento={{
                        ...reservaSeleccionada.anfitrion,
                        moneda: simboloMoneda[reservaSeleccionada.alojamiento.moneda],
                    }}
                    reservaOriginal={reservaSeleccionada}
                />
            )}
        </>
    );
};

export default ReservaCardHuesped;