import api from './../../../api/api'

export const getReservasPorAlojamiento = async (id) => {
    const res = await api.get(`/alojamientos/${id}/reservas`)
    return res.data;
}

export const confirmarReserva = async (id) => {
    const res = await api.put(`/reservas/${id}/confirmar`)
    return res;
}

export const cancelarReserva = async (idReserva, motivo) => {
    const res = await api.put(`/reservas/${idReserva}/cancelar`, {
        motivo: motivo
    })
    return res;
}

export const rechazarReserva = async (idReserva, motivo) => {
    const res = await api.put(`/reservas/${idReserva}/rechazar`, {
        motivo: motivo
    })
    return res;
}

export const crearReserva = async (reserva) => {
        return await api.post('/reservas', reserva);
}

export const modificarReserva = async (id, nuevaFechaInicio, nuevaFechaFin) => {
    return await api.put(`/reservas/${id}/modificar`, {
        nuevaFechaInicio,
        nuevaFechaFin
    });
}