import {Button} from "@mui/material";
import React from "react";

export const BotonModificar = ({reserva, onModificar}) => {
    return (
        <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
                e.stopPropagation();
                onModificar(reserva);
            }}
        >
            Modificar reserva
        </Button>
    )
}