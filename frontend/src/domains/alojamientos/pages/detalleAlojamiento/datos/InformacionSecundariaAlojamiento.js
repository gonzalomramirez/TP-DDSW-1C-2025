import {Box, Chip, Typography} from "@mui/material";
import React from "react";
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import '../DetalleAlojamiento.css';
import {desnormalizarTexto} from "../../../../../shared/functions/normalizacion";

export const InformacionSecundariaAlojamiento = ({ alojamiento }) => {
    if (!alojamiento) return null;

    return (
        <>
            <Box className="contenedor-secundario">
                <Box className="columna-caracteristicas">
                    {alojamiento.caracteristicas.map((carac, i) => (
                        <Chip key={i} label={desnormalizarTexto(carac)} color="primary" className="chip" />
                    ))}
                </Box>

                <Box className="columna-detalles">
                    <Box className="grilla-detalles">
                        <Box className="detalle-item">
                            <PeopleIcon className="icono-detalle" />
                            <Typography>{alojamiento.cantidadMaximaHuespedes} personas</Typography>
                        </Box>
                        <Box className="detalle-item">
                            <AttachMoneyIcon className="icono-detalle" />
                            <Typography>${alojamiento.precioPorNoche} ARS</Typography>
                        </Box>
                        <Box className="detalle-item">
                            <AccessTimeIcon className="icono-detalle" />
                            <Typography>Check-in: {alojamiento.horarioCheckIn} hs</Typography>
                        </Box>
                        <Box className="detalle-item">
                            <AccessTimeIcon className="icono-detalle" />
                            <Typography>Check-out: {alojamiento.horarioCheckOut} hs</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}