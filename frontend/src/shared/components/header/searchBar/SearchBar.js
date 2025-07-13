import React from 'react';
import { TextField, IconButton, Divider, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';
import { useFiltroContext} from "../../../context/FiltroContext";

const SearchBar = () => {
    const { filtros, handleChange, handleSubmit } = useFiltroContext();

    const fields = [
        { label: 'Lugar', name: 'ciudad', type: 'text', value: filtros.ciudad || '', placeholder: 'Explorar destinos' },
        { label: 'Check-in', name: 'fechaCheckIn', type: 'date', value: filtros.fechaCheckIn || '' },
        { label: 'Check-out', name: 'fechaCheckOut', type: 'date', value: filtros.fechaCheckOut || '' },
        { label: 'Cant. de huespedes', name: 'cantidadHuespedes', type: 'number', value: Math.max(filtros.cantidadHuespedes, 1)}
    ];

    return (
        <Box className="search-bar-container">
            {fields.map((field, index) => (
                <React.Fragment key={field.name}>
                    <TextField
                        variant="standard"
                        label={field.label}
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ disableUnderline: true }}
                        className="search-field"
                    />
                    {index < fields.length - 1 && (
                        <Divider orientation="vertical" flexItem className="divider" />
                    )}
                </React.Fragment>
            ))}

            <IconButton onClick={handleSubmit} className="search-button">
                <SearchIcon />
            </IconButton>
        </Box>
    );
};

export default SearchBar;