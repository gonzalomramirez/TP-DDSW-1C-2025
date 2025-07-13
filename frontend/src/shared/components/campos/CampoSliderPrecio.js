import React from 'react';
import { Typography, Slider, Box, Divider } from '@mui/material';
import { useFiltroContext } from '../../context/FiltroContext';

const FiltroSliderPrecio = () => {
    const { filtros, setFiltros } = useFiltroContext();
    const min = Number(filtros.minPrecio) || 0;
    const max = Number(filtros.maxPrecio) || 50000;

    const handleChange = (e, newValue) => {
        const [nuevoMin, nuevoMax] = newValue;
        setFiltros((prev) => ({
            ...prev,
            minPrecio: nuevoMin,
            maxPrecio: nuevoMax
        }));
    };

    return (
        <>
            <Typography variant="subtitle1" gutterBottom>Precio por noche</Typography>
            <Slider
                value={[min, max]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={50000}
                step={100}
                size="small"
            />
            <Box className="slider-labels">
                <Typography>${min}</Typography>
                <Typography>${max}</Typography>
            </Box>
            <Divider sx={{ my: 2, borderColor: 'transparent' }} />
        </>
    );
};

export default FiltroSliderPrecio;