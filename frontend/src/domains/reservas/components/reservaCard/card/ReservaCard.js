import {Box, Typography, Stack, Chip} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InfoIcon from '@mui/icons-material/Info';
import { ESTADO_RESERVA } from "../../../../../shared/data/constantes";

export const ReservaCard = ({ reserva, huesped }) => {
    const fechaInicio = new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString('es-AR', { timeZone: 'UTC' });
    const fechaFin = new Date(reserva.rangoFechas.fechaFin).toLocaleDateString('es-AR', { timeZone: 'UTC' });

    return (
        <Box sx={{mt:3}}>
            <Stack spacing={1}>
                {!huesped && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body1">
                            <strong>Huésped:</strong> {reserva.huespedReservador?.nombre || "Anónimo"}
                        </Typography>
                    </Stack>
                )}

                <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="body1">
                        <strong>Desde:</strong> {fechaInicio}
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <EventAvailableIcon fontSize="small" color="action" />
                    <Typography variant="body1">
                        <strong>Hasta:</strong> {fechaFin}
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <InfoIcon fontSize="small" color="action" />
                    <Typography variant="body1">
                        <strong>Estado:</strong> <Chip
                        label={reserva.estado}
                        color={ESTADO_RESERVA[reserva.estado]}
                        size="small"
                    />
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};
