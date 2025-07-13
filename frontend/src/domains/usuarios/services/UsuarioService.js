import api from "../../../api/api";

export const obtenerAlojamientosDelAnfitrion = async (idUsuario) => {
    try {
        return await api.get(`/usuarios/${idUsuario}/alojamientos`);
    } catch (error) {
        console.error("Error al obtener alojamientos del anfitrión:", error);
        throw error;
    }
};

export const loginUsuario = async (email) => {
    try {
        const response = await api.post('/usuarios/login', { email });
        return response.data;
    } catch (error) {
        console.error("Error en loginUsuario:", error);
        throw error;
    }
};

export const registrarUsuario = async (usuario) => {
    try {
        return await api.post(`/usuarios`, usuario);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
}

export const obtenerReservasDelUsuario = async (idUsuario) => {
    try {
        const response = await api.get(`/usuarios/${idUsuario}/reservas`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener reservas del usuario:", error);
        throw error;
    }
};
