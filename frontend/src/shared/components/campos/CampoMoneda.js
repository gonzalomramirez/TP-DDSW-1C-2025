import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { MONEDAS } from '../../data/constantes';
import { useFiltroContext } from '../../context/FiltroContext';
import { useFormAlojamientoContext } from '../../context/FormAlojamientoContext';

export const CampoMoneda = () => {
    const formAlojamientoContext = useFormAlojamientoContext();
    const filtroContext = useFiltroContext();

    const [value, onChange] = formAlojamientoContext?.formData
        ? [formAlojamientoContext.formData.moneda, (e) => formAlojamientoContext.setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))]
        : [filtroContext.filtros.moneda, filtroContext.handleChange];

    return (
        <TextField
            label="Moneda"
            name="moneda"
            fullWidth
            size="small"
            select
            value={value}
            onChange={onChange}
        >
            {MONEDAS.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                    {label}
                </MenuItem>
            ))}
        </TextField>
    );
};