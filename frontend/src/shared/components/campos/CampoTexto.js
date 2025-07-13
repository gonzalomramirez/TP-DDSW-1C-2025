import {useFormAlojamientoContext} from "../../context/FormAlojamientoContext";
import {TextField} from "@mui/material";

export const CampoTexto = ({ label, name, type = 'text' }) => {
    const { formData, setFormData } = useFormAlojamientoContext()

    return (
        <TextField
            label={label}
            name={name}
            type={type}
            value={formData[name] || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
            fullWidth
            size="small"
            InputLabelProps={type === 'time' ? { shrink: true } : {}}
        />
    );
};