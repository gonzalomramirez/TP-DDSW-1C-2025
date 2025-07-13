import React from 'react';
import {Autocomplete, TextField} from '@mui/material';
import { CIUDADES_POR_PAIS} from "../../data/ciudades";
import {normalizarTexto} from "../../functions/normalizacion";
import { useFiltroContext} from "../../context/FiltroContext";
import {useFormAlojamientoContext} from "../../context/FormAlojamientoContext";

export const CampoCiudad = () => {
    const {filtros, handleChange} = useFiltroContext();
    const {formData, setFormData} = useFormAlojamientoContext()

    const pais = formData?.nombrePais ?? filtros.pais;

    const ciudadSeleccionada = formData?.nombreCiudad ?? filtros.nombreCiudad;

    const valueSetter = formData && setFormData
        ? (val) => setFormData(prev => ({...prev, nombreCiudad: val?.label}))
        : (val) => handleChange({target: { name: 'ciudad', value: val?.value}});

    const opciones = CIUDADES_POR_PAIS[normalizarTexto(pais)] || Object.values(CIUDADES_POR_PAIS).flat();

    return (
        <Autocomplete
            options={opciones}
            getOptionLabel={(option) => option.label}
            value={opciones.find((op) => op.label === ciudadSeleccionada) || null}
            onChange={(e, newValue) => valueSetter(newValue || '')}
            renderInput={(params) => (
                <TextField {...params} label="Ciudad" fullWidth size="small" />
            )}
        />
    );
};