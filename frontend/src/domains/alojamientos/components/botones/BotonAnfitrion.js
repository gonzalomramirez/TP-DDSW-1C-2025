import React from 'react';
import { Button } from '@mui/material';
import '../alojamientoCard/card/AlojamientoCard.css';
import {useAnfitrionContext} from "../../../../shared/context/AnfitrionContext";
import {FormularioAlojamientoModal} from "../formularioAlojamientoModal/FormularioAlojamientoModal";
import {ListarReservasModal} from "../../../reservas/components/listarReservasModal/ListarReservasModal";
import {FormAlojamientoProvider} from "../../../../shared/context/FormAlojamientoContext";
import {ReservaProvider} from "../../../../shared/context/ReservasContext";

export const BotonAnfitrion = ({ alojamiento }) => {
    const { handleModificar, handleVerReservas, modalCrear, modalModificar, modalReservas, errorMensaje, handleGuardarAlojamiento,
        handleGuardarModificacion, alojamientoAEditar } = useAnfitrionContext();

    return (
        <>
            <Button className="boton-anfitrion" onClick={(e) => {
                e.stopPropagation();
                handleModificar(alojamiento);
            }}> Modificar </Button>

            <Button className="boton-anfitrion" onClick={(e) => {
                e.stopPropagation();
                handleVerReservas(alojamiento);
            }}> Ver Reservas </Button>

            <FormAlojamientoProvider
                onGuardarAlojamiento={handleGuardarAlojamiento}
                onGuardarModificacion={handleGuardarModificacion}
                alojamientoInicial={alojamientoAEditar}
            >
                <FormularioAlojamientoModal isOpen={modalCrear.isOpen} onClose={modalCrear.close} errorMensaje={errorMensaje} creacion={true}/>

                <FormularioAlojamientoModal isOpen={modalModificar.isOpen} onClose={modalModificar.close} errorMensaje={errorMensaje} creacion={false}/>

                <ReservaProvider>
                    <ListarReservasModal
                        isOpen={modalReservas.isOpen}
                        onClose={ () => { modalReservas.close(); window.location.reload()} }
                        errorMensaje={errorMensaje}
                    />
                </ReservaProvider>
            </FormAlojamientoProvider>
        </>
    )
};