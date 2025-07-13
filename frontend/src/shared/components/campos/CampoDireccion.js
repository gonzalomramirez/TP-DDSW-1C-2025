import React from 'react';
import { TextField, Box } from '@mui/material';
import { useFiltroContext } from '../../context/FiltroContext';
import { useFormAlojamientoContext } from '../../context/FormAlojamientoContext';

export const CampoDireccion = ({form}) => {
    const formAlojamientoContext = useFormAlojamientoContext();
    const filtroContext = useFiltroContext();

    const [calleValue, calleOnChange] = formAlojamientoContext?.formData
        ? [formAlojamientoContext.formData.calle, (e) => formAlojamientoContext.setFormData(prev => ({ ...prev, calle: e.target.value }))]
        : [filtroContext.filtros.calle, filtroContext.handleChange];

    const [alturaValue, alturaOnChange] = formAlojamientoContext?.formData
        ? [formAlojamientoContext.formData.altura, (e) => formAlojamientoContext.setFormData(prev => ({ ...prev, altura: e.target.value }))]
        : [filtroContext.filtros.altura || '', filtroContext.handleChange];

    return (
        <Box sx={{gap: form ? 2 : 1, display: 'flex', flexDirection: 'column', mt: form ? 0 : 1}}>
            <TextField label="Calle" name="calle" value={calleValue} onChange={calleOnChange} fullWidth size="small"/>

            <TextField label="Altura" name="altura" type="number" value={alturaValue} onChange={alturaOnChange} fullWidth size="small"/>
        </Box>
    );
};