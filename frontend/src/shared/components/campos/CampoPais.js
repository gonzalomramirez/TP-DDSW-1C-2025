import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { PAISES } from '../../data/paises';
import { useFiltroContext } from '../../context/FiltroContext';
import {useFormAlojamientoContext} from "../../context/FormAlojamientoContext";

export const CampoPais = () => {
    const { filtros, handleChange } = useFiltroContext();
    const { formData, setFormData } = useFormAlojamientoContext();

    const selectedValue = formData?.nombrePais ?? filtros.pais;

    const selectedOption =
        PAISES.find((op) => op.value === selectedValue) || null;

    const onChange = formData && setFormData
        ? (val) => setFormData((prev) => ({ ...prev, nombrePais: val }))
        : (val) => handleChange({ target: { name: 'pais', value: val } });

    return (
        <Autocomplete
            className="campo-autocomplete"
            options={PAISES}
            getOptionLabel={(option) => option.label}
            value={selectedOption}
            onChange={(e, newValue) => onChange(newValue?.value || '')}
            renderInput={(params) => (
                <TextField {...params} label="País" fullWidth size="small" />
            )}
        />
    );
};
