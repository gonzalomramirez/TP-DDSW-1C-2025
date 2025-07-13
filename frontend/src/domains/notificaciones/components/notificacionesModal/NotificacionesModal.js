import React, { useEffect, useState } from 'react';
import './NotificacionesModal.css';
import { useAuth } from '../../../../shared/context/AuthContext';
import {
    obtenerNotificacionesNoLeidas,
    marcarNotificacionComoLeida
} from '../../services/notificacionService';

const NotificacionesModal = ({ isOpen, onClose }) => {
    const { usuario } = useAuth();
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        if (!isOpen || !usuario?.id) return;

        const cargarNotificaciones = async () => {
            try {
                const data = await obtenerNotificacionesNoLeidas(usuario.id);
                setNotificaciones(data);
            } catch (err) {
                console.error('Error al cargar notificaciones:', err);
            }
        };

        cargarNotificaciones();
    }, [isOpen, usuario?.id]);

    const handleMarcarComoLeida = async (id) => {
        try {
            await marcarNotificacionComoLeida(id);
            setNotificaciones((prev) =>
                prev.filter((n) => n._id !== id)
            );
        } catch (err) {
            console.error('Error al marcar como leída:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-div">
            <div className="modal-contenido">
                <h2>Notificaciones</h2>
                <button className="btn-cerrar" onClick={onClose}>×</button>

                <ul className="lista-notificaciones">
                    {notificaciones.length === 0 ? (
                        <li className="notificacion vacia">
                            No tenés notificaciones nuevas
                        </li>
                    ) : (
                        notificaciones.map((n) => (
                            <li
                                key={n._id}
                                className={`notificacion ${n.leida ? 'leida' : 'nueva'}`}
                            >
                                <span>{n.mensaje}</span>
                                {!n.leida && (
                                    <button
                                        className="btn-leer"
                                        onClick={() => handleMarcarComoLeida(n._id)}
                                    >
                                        Marcar como leída
                                    </button>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NotificacionesModal;
