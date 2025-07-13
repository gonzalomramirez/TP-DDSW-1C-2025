import {createContext, useContext, useEffect, useState} from "react";
import {crearAlojamiento, modificarAlojamiento} from "../../domains/alojamientos/services/alojamientoService";
import {obtenerAlojamientosDelAnfitrion} from "../../domains/usuarios/services/UsuarioService";
import {useParams} from "react-router-dom";
import {useModalState} from "../functions/useModalState";

export const AnfitrionContext = createContext();

export const AnfitrionProvider = ({children}) => {
    const {id} = useParams();
    const [alojamientos, setAlojamientos] = useState([]);
    const [success, setSuccess] = useState(null);
    const [errorMensaje, setErrorMensaje] = useState('');
    const [alojamientoAEditar, setAlojamientoAEditar] = useState(null);
    const [loading, setLoading] = useState(true);

    const modalCrear = useModalState();
    const modalModificar = useModalState();
    const modalReservas = useModalState();


    useEffect(() => {
        const cargarAlojamientos = async () => {
            try {
                setLoading(true);
                const res = await obtenerAlojamientosDelAnfitrion(id);
                setTimeout(() => {
                    setAlojamientos(Array.isArray(res.data) ? res.data : []);
                    setLoading(false);
                }, 300);
            } catch (err) {
                console.error("Error al obtener alojamientos", err);
            }
        };

        cargarAlojamientos();
    }, [id]);

    const handleAgregarAlojamiento = () => {
        setAlojamientoAEditar(null);
        modalCrear.open();
    };

    const handleModificar = (alojamiento) => {
        setAlojamientoAEditar(alojamiento);
        modalModificar.open();
    };

    const handleVerReservas = (alojamiento) => {
        setAlojamientoAEditar(alojamiento);
        modalReservas.open();
    };

    const handleGuardarAlojamiento = async (nuevoAlojamiento) => {
        try {
            const alojamientoCompleto = {
                ...nuevoAlojamiento,
                anfitrion: id,
                fotos: nuevoAlojamiento.fotos ? [nuevoAlojamiento.fotos] : []
            };

            const response = await crearAlojamiento(alojamientoCompleto);

            setAlojamientos((prev) => [...prev, response.data]);

            modalCrear.close();

            setErrorMensaje('');

            setSuccess("creado");

        } catch (error) {
            setErrorMensaje(error.response.data.message);
        }
    };

    const handleGuardarModificacion = async (alojamientoEditado) => {
        try {
            const alojamientoCompleto = { ...alojamientoEditado, fotos: alojamientoEditado.fotos ? [alojamientoEditado.fotos] : []}

            const alojamientoActualizado = await modificarAlojamiento(alojamientoCompleto._id, alojamientoCompleto);

            setAlojamientos(prev =>
                prev.map(a => a._id === alojamientoActualizado._id ? alojamientoActualizado : a)
            );

            modalModificar.close();
            setAlojamientoAEditar(null);
            setSuccess("modificado");

            window.location.reload();

            return alojamientoActualizado;
        } catch (error) {
            console.error("Error al modificar alojamiento:", error);
            setErrorMensaje(error.response?.data?.message || "No se pudo modificar el alojamiento");
        }
    };

    return (
        <AnfitrionContext.Provider value={{
            alojamientos,
            alojamientoAEditar,
            success,
            setSuccess,
            handleAgregarAlojamiento,
            handleGuardarAlojamiento,
            handleGuardarModificacion,
            handleModificar,
            handleVerReservas,
            modalCrear,
            modalModificar,
            modalReservas,
            errorMensaje,
            loading
        }}>
            {children}
        </AnfitrionContext.Provider>
    );
}

export const useAnfitrionContext = () => useContext(AnfitrionContext)