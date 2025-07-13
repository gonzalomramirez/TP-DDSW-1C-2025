import './PanelAnfitrion.css';
import {Alert, Box, CircularProgress} from "@mui/material";
import { useAnfitrionContext } from "../../../../shared/context/AnfitrionContext";
import AlojamientoCardAnfitrion from "../../../alojamientos/components/alojamientoCard/anfitrion/AlojamientoCardAnfitrion";

export const PanelAnfitrion = () => {
    const { alojamientos, success, setSuccess, handleAgregarAlojamiento, loading } = useAnfitrionContext();

    return (
        <div className="anfitrion-container">
            {success && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
                    {success === "creado" ? "Alojamiento creado con éxito" : "Alojamiento modificado con éxito"}
                </Alert>
            )}
            <h1>Panel del Anfitrión</h1>
            <button className="btn-agregar" onClick = {() => handleAgregarAlojamiento()}>Agregar Alojamiento</button>

            <div className="alojamientos-grid">
                {loading ? (
                    <Box className="loader-container">
                        <CircularProgress size={50} />
                    </Box>
                ) : (
                    <div className="alojamientos-grid">
                        {alojamientos.map(aloj => (
                            <AlojamientoCardAnfitrion key={aloj._id} alojamiento={aloj}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};