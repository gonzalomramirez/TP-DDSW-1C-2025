import { useState } from "react";
import { useFormAlojamientoContext } from "../../context/FormAlojamientoContext";
import { IconButton, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const CampoImagen = () => {
    const [mostrarCampoUrl, setMostrarCampoUrl] = useState(false);
    const { formData, handleChange } = useFormAlojamientoContext();

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" gutterBottom>
                    Imagen (URL)
                </Typography>
                <IconButton size="small" onClick={() => setMostrarCampoUrl(!mostrarCampoUrl)}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </div>

            {mostrarCampoUrl && (
                <TextField
                    fullWidth
                    label="URL de la imagen"
                    name="fotos"
                    value={formData.fotos}
                    onChange={handleChange}
                    sx={{ mt: 1 }}
                />
            )}
        </>
    );
};
