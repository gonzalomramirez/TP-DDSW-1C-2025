import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { normalizarTexto, desnormalizarTexto } from "../functions/normalizacion";
import {buscarAlojamientos} from "../../domains/alojamientos/services/alojamientoService";

const FiltroContext = createContext(null);

export const FiltroProvider = ({ children }) => {

    const navigate = useNavigate();

    const location = useLocation();

    const [filtrosAplicados, setFiltrosAplicados] = useState({});

    const [alojamientos, setAlojamientos] = useState([]);

    const [error, setError] = useState(null);

    const [filtros, setFiltros] = useState({caracteristicas: [], cantidadMaximaHuespedes: 1, moneda: 'PESO_ARG'});

    const [loading, setLoading] = useState(false);

    const [paginaActual, setPaginaActual] = useState(1);

    const pageSize = 6;

    const [hayProximaPagina, setHayProximaPagina] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const normalizados = {
            ...filtros,
            ciudad: normalizarTexto(filtros.ciudad),
            pais: normalizarTexto(filtros.pais),
            calle: normalizarTexto(filtros.calle),
            caracteristicas: filtros.caracteristicas.join(','),
            cantidadHuespedes: parseInt(filtros.cantidadMaximaHuespedes, 10),
            moneda: filtros.moneda || 'PESO_ARG',
        };

        setFiltrosAplicados(normalizados);
        setPaginaActual(1)

        const params = new URLSearchParams();
        Object.entries(normalizados).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.append(key, value);
            }
        });

        navigate(`/alojamientos?${params.toString()}`);
    };

    const limpiarFiltros = useCallback(() => {
        setFiltros({
            ciudad: '',
            pais: '',
            calle: '',
            caracteristicas: [],
            cantidadMaximaHuespedes: 1,
            fechaCheckIn: '',
            fechaCheckOut: '',
            moneda: 'PESO_ARG' });
        setFiltrosAplicados({});
        navigate(location.pathname);
    }, [navigate, location.pathname]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const filtrosDesdeURL = Object.fromEntries(searchParams.entries());
        const hayParams = Object.keys(filtrosDesdeURL).length > 0;

        if (hayParams) {
            const parseado = {
                ...filtrosDesdeURL,
                caracteristicas: (filtrosDesdeURL.caracteristicas || '')
                    .split(',')
                    .filter(Boolean),
                cantidadMaximaHuespedes: parseInt(filtrosDesdeURL.cantidadMaximaHuespedes || '1')
            };
            setFiltros({
                ...parseado,
                ciudad: desnormalizarTexto(parseado.ciudad),
                pais: desnormalizarTexto(parseado.pais),
                calle: desnormalizarTexto(parseado.calle)
            });

            setFiltrosAplicados(filtrosDesdeURL);
        }
    }, [location.search]);


    useEffect(() => {
        const obtenerAlojamientos = async () => {
            setLoading(true);
            try {
                const data = await buscarAlojamientos({
                    ...filtrosAplicados,
                    page: paginaActual,
                    pageSize: pageSize
                });
                setAlojamientos(data);
                setHayProximaPagina(data.length === pageSize)
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            } catch (e) {
                setError(e.message);
            }
        };

        if (Object.keys(filtrosAplicados).length > 0) {
            obtenerAlojamientos();
        }
    }, [filtrosAplicados, paginaActual]);;

    useEffect(() => {
        if (location.pathname !== '/alojamientos') limpiarFiltros();
    }, [location.pathname, limpiarFiltros]);

    return (
        <FiltroContext.Provider value={{
            filtros,
            setFiltros,
            handleChange,
            handleSubmit,
            alojamientos,
            error,
            limpiarFiltros,
            loading,
            paginaActual,
            setPaginaActual,
            pageSize,
            hayProximaPagina
        }}>
            {children}
        </FiltroContext.Provider>
    );
};

export const useFiltroContext = () => {
    const context = useContext(FiltroContext);
    if (!context) throw new Error('useFiltroContext debe usarse dentro de FiltroProvider');
    return context;
};