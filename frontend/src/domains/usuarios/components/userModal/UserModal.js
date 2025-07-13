import React from 'react';
import { useUsuarioContext } from "../../../../shared/context/UsuarioContext";
import {Dialog} from '@mui/material';
import UserModalActions from "./userModalComponents/UserModalActions";
import UserModalContent from "./userModalComponents/UserModalContent";
import UserModalTitle from "./userModalComponents/UserModalTitle";

const UserModal = ({ open, handleClose }) => {

    const {
        usuario,
        email, setEmail,
        nombre, setNombre,
        tipoUsuario, setTipoUsuario,
        loading, error, success,
        modo, setModo,
        handleLogin, handleRegistro, handleLogout,
        cerrarModal
    } = useUsuarioContext();

    return (
        <Dialog open={open} onClose={() => {cerrarModal(); handleClose();}} fullWidth maxWidth="xs">
            <UserModalTitle usuario={usuario} modo={modo} />

            <UserModalContent usuario={usuario} modo={modo} error={error} success={success} email={email} setEmail={setEmail}
                              nombre={nombre} setNombre={setNombre} tipoUsuario={tipoUsuario} setTipoUsuario={setTipoUsuario}/>

            <UserModalActions usuario={usuario} modo={modo} loading={loading} handleLogin={handleLogin} handleRegistro={handleRegistro}
                              handleLogout={handleLogout} setModo={setModo} cerrarModal={() => {cerrarModal(); handleClose();}}/>
        </Dialog>
    );
};

export default UserModal;
