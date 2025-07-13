import AlojamientoCard from "../card/AlojamientoCard";
import {BotonAnfitrion} from "../../botones/BotonAnfitrion";
import React from "react";
import {Box, Card} from "@mui/material";
import {redirigirADetalle} from "../../../services/alojamientoService";
import {useNavigate} from "react-router-dom";
import "../card/AlojamientoCard.css"

const AlojamientoCardAnfitrion = ({alojamiento}) => {
    const navigate = useNavigate();
    const handleCardClick = () => redirigirADetalle(navigate, alojamiento._id);

    return (
        <div >
            <Card onClick={handleCardClick} className="tarjeta-alojamiento">
                <AlojamientoCard alojamiento={alojamiento} />

                <Box className="contenedor-botones">
                    <BotonAnfitrion alojamiento={alojamiento} />
                </Box>
            </Card>
        </div>
    )
}

export default AlojamientoCardAnfitrion;