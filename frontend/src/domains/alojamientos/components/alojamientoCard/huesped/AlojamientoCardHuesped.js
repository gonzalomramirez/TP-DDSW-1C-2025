import AlojamientoCard from "../card/AlojamientoCard";
import {Box, Card} from "@mui/material";
import React from "react";
import {BotonHuesped} from "../../botones/BotonHuesped";
import {useAuth} from "../../../../../shared/context/AuthContext";
import {redirigirADetalle} from "../../../services/alojamientoService";
import {useNavigate} from "react-router-dom";

export const AlojamientoCardHuesped = ({alojamiento}) => {
    const { usuario } = useAuth();

    const anfitrionId = typeof alojamiento.anfitrion === 'object'
        ? alojamiento.anfitrion._id
        : alojamiento.anfitrion;

    const esPropio = usuario?.id === anfitrionId;

    const navigate = useNavigate();

    const handleCardClick = () => redirigirADetalle(navigate, alojamiento._id);

    return (
        <div>
            <Card onClick={handleCardClick} className="tarjeta-alojamiento">

                <AlojamientoCard alojamiento={alojamiento} />

                <Box className="contenedor-botones">
                        <BotonHuesped esPropio={esPropio} alojamiento={alojamiento} />
                </Box>
            </Card>
        </div>
    )
}