import {createContext, useContext, useState} from "react";
import {useAuth} from "./AuthContext";
import {useNavigate} from "react-router-dom";
import {loginUsuario, registrarUsuario} from "../../domains/usuarios/services/UsuarioService";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const { usuario, login, logout } = useAuth();

    const [modo, setModo] = useState('login');
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('HUESPED');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const resetForm = () => {
        setEmail('');
        setNombre('');
        setTipoUsuario('HUESPED');
        setError('');
        setSuccess('');
    };

    const cerrarModal = () => {
        resetForm();
        setModo('login');
    };

    const handleRegistro = async () => {
        if (!email || !nombre) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            setLoading(true);
            await registrarUsuario({ email, nombre, tipo: tipoUsuario });
            setSuccess("¡Registro exitoso!");
            setTimeout(cerrarModal, 1500);
        } catch (err) {
            setError(err.response?.status === 409
                ? "Ya existe un usuario con ese email"
                : "Error al registrar usuario");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!email) {
            setError("El email es obligatorio");
            return;
        }

        try {
            setLoading(true);
            const usuarioLogueado = await loginUsuario(email);
            login(usuarioLogueado);
            setSuccess("Sesión iniciada correctamente");
            setTimeout(cerrarModal, 1500);
        } catch (err) {
            setError(err.response?.status === 404
                ? "Usuario no encontrado"
                : "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        cerrarModal();
        navigate('/')
    };

    return (
        <UsuarioContext.Provider value={{
            usuario,
            login,
            logout,
            modo,
            setModo,
            email, setEmail,
            nombre, setNombre,
            tipoUsuario, setTipoUsuario,
            loading, error,
            success, setSuccess,
            resetForm, cerrarModal,
            handleRegistro, handleLogin, handleLogout
        }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export const useUsuarioContext = () => useContext(UsuarioContext);