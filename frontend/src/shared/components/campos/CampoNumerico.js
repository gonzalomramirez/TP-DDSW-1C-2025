import {useFormAlojamientoContext} from "../../context/FormAlojamientoContext";
import {TextField} from "@mui/material";

export const CampoNumerico = ({ label, name }) => {
    const { formData, setFormData } = useFormAlojamientoContext();

    return (
        <TextField
            label={label}
            name={name}
            type="number"
            value={formData[name] || 0}
            onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
            fullWidth
            size="small"
        />
    );
};