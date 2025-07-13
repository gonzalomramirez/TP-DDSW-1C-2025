import {Typography, Stack, Box} from '@mui/material';
import './ReservaCardAnfitrion.css';
import {ReservaCard} from "../card/ReservaCard";
import {BotonCancelar} from "../botones/BotonCancelar";
import {BotonConfirmar} from "../botones/BotonConfirmar";
import {BotonMotivoCancelacion} from "../botones/BotonMotivoCancelacion";
import {useState} from "react";

export const ReservaCardAnfitrion = ({ reserva }) => {
    const [mostrarMotivo, setMostrarMotivo] = useState(false);

    return (
        <Box variant="outlined" className="tarjeta-reserva">
            <Box>
                <ReservaCard reserva={reserva} huesped={false}/>

                <Stack direction="column" spacing={2} mt={2}>

                    {(reserva.estado === "PENDIENTE" || reserva.estado === "CONFIRMADA") && (!mostrarMotivo ?
                        (
                            <Stack direction={{ xs: "column", sm:"row" }} spacing={2}>
                                { reserva.estado === "PENDIENTE" &&  <BotonConfirmar reserva={reserva}/> }

                                <BotonCancelar setMostrarMotivo={setMostrarMotivo} anfitrion={true}/>
                            </Stack>
                        ) : (
                            <BotonMotivoCancelacion reserva={reserva} setMostrarMotivo={setMostrarMotivo} anfitrion={true}/>
                        ))
                    }

                    {reserva.estado === "CANCELADA" && (
                        <Typography variant="body2" color="text.secondary">
                            Esta reserva ha sido cancelada.
                        </Typography>
                    )}

                </Stack>
            </Box>
        </Box>
    );
};