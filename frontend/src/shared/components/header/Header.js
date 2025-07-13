import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './Header.css';
import SearchBar from './searchBar/SearchBar';
import UserModal from '../../../domains/usuarios/components/userModal/UserModal';
import NotificacionesModal from '../../../domains/notificaciones/components/notificacionesModal/NotificacionesModal';
import { useAuth } from '../../context/AuthContext';
import {useModalState} from "../../functions/useModalState";
import MenuDesplegable from "./menuDesplegable/MenuDesplegable";

const Header = () => {
    const location = useLocation();
    const { usuario } = useAuth();
    const mostrarSearchBar = location.pathname === '/' || location.pathname.startsWith('/alojamientos');

    const authModal = useModalState();
    const notificacionesModal = useModalState();

    return (
        <AppBar position="static" color="inherit" elevation={1} className="barra-navegacion">
            <Toolbar className="toolbar-header">
                <Typography variant="h5" component={Link} to="/" className="logo-enlace">
                    <img src={logo} alt="Logo de birbnb" className="logo-imagen" />
                </Typography>

                {mostrarSearchBar && (
                    <Box className="contenedor-busqueda-header">
                        <SearchBar />
                    </Box>
                )}

                <Stack direction="row" spacing={1} alignItems="center" className="botones-header">
                    <IconButton onClick={authModal.open}>
                        <AccountCircleIcon />
                    </IconButton>

                    {usuario && (
                        <>
                            <IconButton onClick={notificacionesModal.open}>
                                <NotificationsIcon />
                            </IconButton>

                            <MenuDesplegable />
                        </>
                    )}
                </Stack>

                <UserModal open={authModal.isOpen} handleClose={authModal.close} />
                <NotificacionesModal isOpen={notificacionesModal.isOpen} onClose={notificacionesModal.close} />
            </Toolbar>
        </AppBar>

    );
};

export default Header;