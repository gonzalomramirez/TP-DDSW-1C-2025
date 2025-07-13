import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import './MenuDesplegable.css';

const MenuDesplegable = () => {
    const { usuario } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();

    const handleToggle = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const irAMisReservas = () => {
        navigate(`/usuarios/${usuario.id}/reservas`);
        handleClose();
    };

    const irAMisAlojamientos = () => {
        navigate(`/usuarios/${usuario.id}/alojamientos`);
        handleClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="menu-desplegable-wrapper" ref={menuRef}>
            <IconButton onClick={handleToggle}>
                <MenuIcon />
            </IconButton>

            {open && (
                <div className="menu-personalizado">
                    <div className="menu-item" onClick={irAMisReservas}>Ver mis reservas</div>
                    {usuario?.tipo === 'ANFITRION' && (
                        <div className="menu-item" onClick={irAMisAlojamientos}>Mis alojamientos</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuDesplegable;
