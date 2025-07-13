import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerAlojamientoPorId } from "../../services/alojamientoService";
import { Box, Paper, CircularProgress } from '@mui/material';
import 'swiper/css';
import './DetalleAlojamiento.css';
import { InformacionPrincipalAlojamiento } from "./datos/InformacionPrincipalAlojamiento";
import { InformacionSecundariaAlojamiento } from "./datos/InformacionSecundariaAlojamiento";
import { ImagenesAlojamiento } from "./datos/ImagenesAlojamiento";
import {BotonAnfitrion} from "../../components/botones/BotonAnfitrion";
import {BotonHuesped} from "../../components/botones/BotonHuesped";
import {useAnfitrionContext} from "../../../../shared/context/AnfitrionContext";
import {useAuth} from "../../../../shared/context/AuthContext";

const DetalleAlojamiento = () => {
    const { id } = useParams();
    const { usuario } = useAuth();
    const [alojamiento, setAlojamiento] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { handleModificar, handleVerReservas } = useAnfitrionContext()

    const anfitrionId = alojamiento && typeof alojamiento.anfitrion === 'object'
        ? alojamiento.anfitrion._id
        : alojamiento?.anfitrion;

    const esPropio = usuario?.id && anfitrionId && usuario.id === anfitrionId;

    useEffect(() => {
        const fetchAlojamiento = async () => {
            try {
                const data = await obtenerAlojamientoPorId(id);
                setTimeout(() => {
                    setAlojamiento(data);
                    setCargando(false);
                }, 750);
            } catch (err) {
                console.error("Error al obtener alojamiento:", err);
                setCargando(false);
            }
        };

        fetchAlojamiento();
    }, [id]);

    if (cargando) {
        return (
            <Box className="loader-container">
                <CircularProgress size={50} />
            </Box>
        );
    }

    return (
        <Paper className="contenedor-principal" elevation={3}>
            <ImagenesAlojamiento alojamiento={alojamiento} />
            <Box className="seccion-texto">
                <InformacionPrincipalAlojamiento alojamiento={alojamiento} />
                <InformacionSecundariaAlojamiento alojamiento={alojamiento} />
                <Box className="contenedor-botones">
                    {esPropio ? (
                        <BotonAnfitrion alojamiento={alojamiento} onModificar={handleModificar} onVerReservas={handleVerReservas}/>
                    ) : (
                        <BotonHuesped esPropio={esPropio} alojamiento={alojamiento} />
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default DetalleAlojamiento;