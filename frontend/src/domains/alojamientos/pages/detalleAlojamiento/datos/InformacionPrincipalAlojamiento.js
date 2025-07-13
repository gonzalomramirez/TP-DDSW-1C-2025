import {Divider, Typography} from "@mui/material";
import '../DetalleAlojamiento.css';
import React from "react";

export const InformacionPrincipalAlojamiento = ({ alojamiento }) => {
    if (!alojamiento) return null;

    return (
        <>
            <Typography variant="h3" className="titulo">{alojamiento.nombre}</Typography>

            <Typography className="direccion">
                {`${alojamiento.direccion.calle} ${alojamiento.direccion.altura}, ${alojamiento.direccion.ciudad.nombre}, ${alojamiento.direccion.ciudad.pais.nombre}`}
            </Typography>

            <Typography variant="body2" color="text.secondary" className="anfitrion">
                Anfitrión: {alojamiento.anfitrion.nombre}
            </Typography>

            <Divider className="separador" />

            <Typography className="descripcion">
                {alojamiento.descripcion}
            </Typography>

            <Divider className="separador" />
        </>
    )
}
