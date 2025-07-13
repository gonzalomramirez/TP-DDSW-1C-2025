import { createContext, useContext, useState } from 'react';
import {
    getReservasPorAlojamiento,
    confirmarReserva,
    cancelarReserva,
    rechazarReserva
} from "../../domains/reservas/services/reservaService"
import {obtenerReservasDelUsuario} from "../../domains/usuarios/services/UsuarioService";

const ReservaContext = createContext();

export const ReservaProvider = ({ children }) => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState('');

    const fetchReservasPorAlojamiento = async (alojamientoId) => {
        setLoading(true);
        setErrorMensaje('');
        setReservas([]);

        try {
            const data = await getReservasPorAlojamiento(alojamientoId);

            setTimeout(() => {
                if (Array.isArray(data)) {
                    setReservas(ordenar(data));
                } else {
                    console.warn("Reservas inválidas:", data);
                    setReservas([]);
                }
                setLoading(false);
            }, 400);
        } catch (err) {
            setErrorMensaje(err?.response?.data?.message || "Error al obtener reservas");
            setLoading(false);
        }
    };


    const fetchReservasPorUsuario = async (usuarioId) => {
        setLoading(true);
        try {
            const data = await obtenerReservasDelUsuario(usuarioId);
            setReservas(data);
        } catch (err) {
            setErrorMensaje(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmarReserva = async (reserva) => {
        try {
            const response = await confirmarReserva(reserva._id);

            setReservas(prev => prev.map(r => r._id === response.data._id ? response.data : r));
        } catch (err) {
            setErrorMensaje(err.response.data.message)
        }
    };

    const handleCancelarReserva = async (reserva, motivo) => {
        try {
            const actualizada = await cancelarReserva(reserva._id, motivo);
            setReservas(prev => prev.map(r => r._id === actualizada.data._id ? actualizada : r));
        } catch (err) {
            setErrorMensaje(err.response.data.message);
        }
    };

    const handleRechazarReserva = async (reserva, motivo) => {
        try {
            const actualizada = await rechazarReserva(reserva._id, motivo);
            setReservas(prev => prev.map(r => r._id === actualizada.data._id ? actualizada : r));
        } catch (err) {
            setErrorMensaje(err.response.data.message);
        }
    };

    const ordenar = (data) => {
        return [...data].sort((a, b) => {
            if (a.estado === "CANCELADA" && b.estado !== "CANCELADA") return 1;
            if (a.estado !== "CANCELADA" && b.estado === "CANCELADA") return -1;
            return new Date(a.rangoFechas.fechaInicio) - new Date(b.rangoFechas.fechaInicio);
        });
    };

    return (
        <ReservaContext.Provider value={{
            reservas,
            loading,
            setReservas,
            fetchReservasPorAlojamiento,
            fetchReservasPorUsuario,
            handleConfirmarReserva,
            handleCancelarReserva,
            handleRechazarReserva,
            errorMensaje,
        }}>
            {children}
        </ReservaContext.Provider>
    );
};

export const useReservaContext = () => useContext(ReservaContext);