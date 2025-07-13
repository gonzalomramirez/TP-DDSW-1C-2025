import React, { useState } from 'react';
import { Typography, Select, MenuItem, Chip, Box } from '@mui/material';
import { CARACTERISTICA } from '../../data/constantes';
import { useFiltroContext } from '../../context/FiltroContext';
import { useFormAlojamientoContext } from '../../context/FormAlojamientoContext';

export const CampoCaracteristicas = () => {
    const formAlojamientoContext = useFormAlojamientoContext();
    const filtroContext = useFiltroContext();

    const [open, setOpen] = useState(false);

    const [value, onChange] = formAlojamientoContext?.formData
        ? [
            formAlojamientoContext.formData.caracteristicas,
            (e) => {
                const valor = e.target.value;
                formAlojamientoContext.setFormData(prev => ({...prev, caracteristicas: typeof valor === 'string' ? valor.split(',') : valor}));
                setOpen(false);
            },
        ] :
        [
            filtroContext.filtros.caracteristicas,
            (e) => {
                const valor = e.target.value;
                filtroContext.setFiltros((prev) => ({ ...prev, caracteristicas: valor }));
                setOpen(false);
            },
        ];

    return (
        <>
            <div className="campo-select">
                <Typography variant="h6" gutterBottom sx={{mb:2, textAlign: 'center'}}>Características</Typography>
                <Select
                    multiple
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    size="small"
                    renderValue={(selected) => (
                        <Box className="chips-container">
                            {selected.map((caract) => (
                                <Chip key={caract} label={caract.replace(/_/g, ' ')} size="small" />
                            ))}
                        </Box>
                    )}
                >
                    {Object.values(CARACTERISTICA).map((caract) => (
                        <MenuItem key={caract} value={caract}>
                            {caract.replace(/_/g, ' ')}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </>
    );
};