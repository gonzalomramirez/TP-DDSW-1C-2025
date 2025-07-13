import {Box, Button, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {useReservaContext} from "../../../../../shared/context/ReservasContext";

export const BotonMotivoCancelacion = ({reserva, setMostrarMotivo, anfitrion}) => {
    const {handleCancelarReserva, handleRechazarReserva} = useReservaContext();
    const [motivo, setMotivo] = useState("");

    const handleCancelarConfirmado = () => {
        handleCancelarReserva(reserva, motivo);
        setMostrarMotivo(false);
        setMotivo("");
    };

    const handleCancelarAbortado = () => {
        setMostrarMotivo(false);
        setMotivo("");
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <Box>
            <TextField
                label="Motivo de cancelación"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                onClick={(e) => stopPropagation(e)}
                fullWidth
                multiline
                minRows={2}
            />
            <Stack direction="row" spacing={2} mt={1}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={(e)=> {
                        (anfitrion ? handleRechazarReserva : handleCancelarConfirmado)(reserva, motivo)
                        stopPropagation(e)
                        window.location.reload();
                    }}
                    disabled={!motivo.trim()}
                    className="botones"
                >
                    {anfitrion ? "Confirmar rechazo" : "Confirmar cancelación"}
                </Button>

                <Button onClick={(e) => {stopPropagation(e); handleCancelarAbortado()}} className="botones">
                    Cancelar
                </Button>
            </Stack>
        </Box>
    )
}