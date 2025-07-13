import React from 'react';
import { CardMedia, CardContent, Typography, Box } from '@mui/material';
import placeholderImage from '../../../../../assets/placeholder.png';
import './AlojamientoCard.css';
import { simboloMoneda } from '../../../../../shared/data/constantes';

const AlojamientoCard = ({ alojamiento}) => {
    const imagen = alojamiento.fotos?.[0] || placeholderImage;

    return (
        <>
            <CardMedia
                component="img"
                image={imagen}
                alt={alojamiento.nombre}
                className="card-imagen"
            />

            <CardContent>
                <Typography variant="h6">{alojamiento.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {alojamiento.direccion.ciudad.nombre}, {alojamiento.direccion.ciudad.pais.nombre}
                </Typography>
                <Box mt={1}>
                    <Typography variant="subtitle1" color="primary">
                        {simboloMoneda[alojamiento.moneda]} {alojamiento.precioPorNoche} por noche
                    </Typography>
                </Box>
            </CardContent>
        </>
    );
};

export default AlojamientoCard;