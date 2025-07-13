import React from 'react';
import { TextField } from '@mui/material';
import { useFiltroContext } from '../../context/FiltroContext';
import { useFormAlojamientoContext } from '../../context/FormAlojamientoContext';

export const CampoCantidadHuespedes = () => {
    const formAlojamientoContext = useFormAlojamientoContext();
    const filtroContext = useFiltroContext();

    const [value, onChange] = formAlojamientoContext?.formData
        ? [
            Math.max(formAlojamientoContext.formData.cantidadMaximaHuespedes, 1),
            (e) => formAlojamientoContext.setFormData((prev) => ({...prev, cantidadMaximaHuespedes: Number(e.target.value),})),
        ]
        : [
            Math.max(filtroContext.filtros.cantidadMaximaHuespedes, 1),
            filtroContext.handleChange,
        ];

    return (
        <TextField
            label="Cant. de huéspedes"
            name={'cantidadMaximaHuespedes'}
            type="number"
            fullWidth
            size="small"
            value={value}
            onChange={onChange}
            inputProps={{ min: 1 }}
        />
    );
};