import React from 'react';
import './ReservaConfirmadaModal.css';

const ModalReservaConfirmada = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-icon">✅</div>
                <div className="modal-title">¡Reserva creada!</div>
                <div className="modal-text">
                    Tu reserva fue creada exitosamente. Pronto será confirmada el anfitrión
                </div>
                <button className="modal-button" onClick={onClose}>Aceptar</button>
            </div>
        </div>
    );
};

export default ModalReservaConfirmada;