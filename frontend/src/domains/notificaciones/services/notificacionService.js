import api from "../../../api/api";

export const obtenerNotificacionesNoLeidas = async (usuarioId) => {
    const res = await api.get(`/usuarios/${usuarioId}/notificaciones/sin-leer`);
    return res.data;
};

export const marcarNotificacionComoLeida = async (notificacionId) => {
    const res = await api.put(`/notificaciones/${notificacionId}/marcar-leida`);
    return res.data;
};