import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import {CampoDireccion} from "../../../../shared/components/campos/CampoDireccion";
import SliderPrecio from "../../../../shared/components/campos/CampoSliderPrecio";
import {CampoMoneda} from "../../../../shared/components/campos/CampoMoneda";
import {CampoCaracteristicas} from "../../../../shared/components/campos/CampoCaracteristicas";
import {CampoCantidadHuespedes} from "../../../../shared/components/campos/CampoCantidadHuespedes";
import {useFiltroContext} from '../../../../shared/context/FiltroContext';
import {CampoCiudad} from "../../../../shared/components/campos/CampoCiudad";
import {CampoPais} from "../../../../shared/components/campos/CampoPais";
import './PanelFiltros.css';

const PanelFiltros = ({ onClose }) => {
    const { handleSubmit, limpiarFiltros } = useFiltroContext();

    const aplicarFiltros = () => {
        handleSubmit();
        if (onClose) onClose();
    }

    return (
        <Box className="sidebar-filtros">
            <Typography variant="subtitle1" gutterBottom>Ubicación</Typography>

            <CampoPais />

            <CampoCiudad />

            <CampoDireccion/>

            <Divider sx={{ my: 2 }} />

            <CampoCantidadHuespedes/>

            <Divider sx={{ my: 2 }} />

            <SliderPrecio/>

            <CampoMoneda/>

            <Divider sx={{ my: 2 }} />

            <CampoCaracteristicas/>

            <Button variant="outlined" fullWidth className="buscar-button" size="small" onClick={limpiarFiltros}> Limpiar filtros< /Button>

            <Button variant="contained" fullWidth className="buscar-button" size="small" onClick={aplicarFiltros}> Buscar </Button>
        </Box>
    );
};

export default PanelFiltros;