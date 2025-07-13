import {createContext, useContext, useEffect, useState} from 'react';

const FormAlojamientoContext = createContext(null);

export const FormAlojamientoProvider = ({ children, onGuardarAlojamiento, onGuardarModificacion, alojamientoInicial }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precioPorNoche: 0,
        moneda: "PESO_ARG",
        horarioCheckIn: "",
        horarioCheckOut: "",
        calle: "",
        altura: 0,
        nombreCiudad: "",
        nombrePais: "",
        latitud: 0,
        longitud: 0,
        cantidadMaximaHuespedes: 1,
        caracteristicas: [],
        fotos: ""
        })

    const limpiarFormulario = () => {
        setFormData({
            nombre: "",
            descripcion: "",
            precioPorNoche: 0,
            moneda: "PESO_ARG",
            horarioCheckIn: "",
            horarioCheckOut: "",
            calle: "",
            altura: 0,
            nombreCiudad: "",
            nombrePais: "",
            latitud: 0,
            longitud: 0,
            cantidadMaximaHuespedes: 1,
            caracteristicas: [],
            fotos: []
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGuardarAlojamiento = () => {onGuardarAlojamiento(formData) }

    const handleGuardarModificacion = () => {
        onGuardarModificacion(formData)
    }

    const handleChangeCaracteristicas = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            caracteristicas: typeof value === 'string' ? value.split(',') : value
        }));
    };

    useEffect(() => {
        if (alojamientoInicial) {
            const ciudad = alojamientoInicial.direccion?.ciudad?.nombre || "";
            const pais = alojamientoInicial.direccion?.ciudad?.pais?.nombre || "";
            const calle = alojamientoInicial.direccion?.calle || "";
            const altura = alojamientoInicial.direccion?.altura || 0;
            const latitud = alojamientoInicial.direccion?.lat || 0;
            const longitud = alojamientoInicial.direccion?.long || 0;
            const imagenUrl = alojamientoInicial.fotos?.[0] || "";

            setFormData({
                ...alojamientoInicial,
                nombreCiudad: ciudad,
                nombrePais: pais,
                calle: calle,
                altura: altura,
                latitud: latitud,
                longitud: longitud,
                fotos: imagenUrl
            });
        }
    }, [alojamientoInicial]);

    return (
        <FormAlojamientoContext.Provider value={{
            formData,
            setFormData,
            handleChange,
            handleChangeCaracteristicas,
            handleGuardarAlojamiento,
            handleGuardarModificacion,
            limpiarFormulario
        }}>
            {children}
        </FormAlojamientoContext.Provider>
    );
};

export const useFormAlojamientoContext = () => useContext(FormAlojamientoContext) || {};