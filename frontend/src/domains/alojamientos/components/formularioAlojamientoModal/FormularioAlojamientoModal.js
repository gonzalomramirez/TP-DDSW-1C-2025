import React from 'react';
import {Typography, Button, Alert, Divider, Modal} from '@mui/material';
import './FormularioAlojamientoModal.css';
import { useFormAlojamientoContext } from "../../../../shared/context/FormAlojamientoContext";
import {CampoTexto} from "../../../../shared/components/campos/CampoTexto";
import {CampoNumerico} from "../../../../shared/components/campos/CampoNumerico";
import {CampoMoneda} from "../../../../shared/components/campos/CampoMoneda";
import {CampoCantidadHuespedes} from "../../../../shared/components/campos/CampoCantidadHuespedes";
import {CampoPais} from "../../../../shared/components/campos/CampoPais";
import {CampoCiudad} from "../../../../shared/components/campos/CampoCiudad";
import {CampoDireccion} from "../../../../shared/components/campos/CampoDireccion";
import {CampoCaracteristicas} from "../../../../shared/components/campos/CampoCaracteristicas";
import {CampoImagen} from "../../../../shared/components/campos/CampoImagen";

export const FormularioAlojamientoModal = ({ isOpen, onClose, errorMensaje, creacion }) => {
    const { handleGuardarModificacion, formData, handleGuardarAlojamiento } = useFormAlojamientoContext();
    if (!isOpen) return null;

    const onSubmit = () => {
        creacion ? handleGuardarAlojamiento(formData) : handleGuardarModificacion(formData);
    };

    return (
        <Modal open={isOpen} onClick={(e) => e.stopPropagation()}
               onClose={onClose} className="fondo-modal" BackdropProps={{sx:{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}}>
            <div className="contenido-modal" onClick={(e) => e.stopPropagation()}>
                {errorMensaje && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {errorMensaje}
                    </Alert>
                )}

                <Divider sx={{ marginBottom: 2 }} />

                <Typography variant="h5" gutterBottom className="titulo-modal">
                    {creacion ? "Crear Alojamiento" : "Modificar Alojamiento"}
                </Typography>

                <Divider sx={{ marginBottom: 2 }} />

                <div className="formulario-campos">
                    <div className="bloque-campos">
                        <Typography variant="h6" gutterBottom className="subtipos"> Información General </Typography>
                        <CampoTexto label="Nombre" name="nombre" />
                        <CampoTexto label="Descripción" name="descripcion" multiline />
                        <CampoNumerico label="Precio por noche" name="precioPorNoche" />
                        <CampoMoneda />
                        <CampoCantidadHuespedes />
                    </div>

                    <div className="bloque-campos">
                        <Typography variant="h6" gutterBottom className="subtipos"> Ubicacion </Typography>
                        <CampoPais />
                        <CampoCiudad />
                        <CampoDireccion form={true}/>
                    </div>

                    <div className="bloque-campos">
                        <Typography variant="h6" gutterBottom  className="subtipos"> Horarios </Typography>
                        <CampoTexto label="Check-in" name="horarioCheckIn" type="time" />
                        <CampoTexto label="Check-out" name="horarioCheckOut" type="time" />
                        <CampoCaracteristicas />
                        <CampoImagen />
                    </div>
                </div>

                <div className="botones-accion">
                    <Button variant="outlined" onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={onSubmit}>Guardar</Button>
                </div>
            </div>
        </Modal>
    );
};
