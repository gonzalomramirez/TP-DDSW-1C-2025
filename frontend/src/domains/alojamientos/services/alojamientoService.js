import api from '../../../api/api';

export const buscarAlojamientos = async (filtros) => {
    try {
        const res = await api.get('/alojamientos', { params: filtros });
        return res.data;
    } catch (error) {
        throw new Error('Error al buscar alojamientos');
    }
};

export const obtenerAlojamientoPorId = async (id) => {
    try {
        const respuesta = await api.get(`/alojamientos/${id}`);
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener el alojamiento:', error);
        throw error;
    }
};

export const redirigirADetalle = (navigate, id) => {
    navigate(`/alojamientos/${id}`);
};

export const crearAlojamiento = async (alojamiento) => {
    const response = await api.post('/alojamientos', alojamiento);
    return response;
};

export const modificarAlojamiento = async (id, datos) => {
    const response = await api.put(`/alojamientos/${id}`, datos);
    return response.data;
};