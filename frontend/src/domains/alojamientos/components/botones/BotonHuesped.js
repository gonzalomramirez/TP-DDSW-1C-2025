import React, {useState} from 'react';
import { Button } from '@mui/material';
import '../alojamientoCard/card/AlojamientoCard.css';
import FormularioReservaModal from "../../../reservas/components/formularioReservaModal/FormularioReservaModal";
import {simboloMoneda} from "../../../../shared/data/constantes";
import {useNavigate} from "react-router-dom";

export const BotonHuesped = ({ esPropio, alojamiento }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleAbrirReserva = (e) => {
        e.stopPropagation();
        setModalOpen(true);
    };
    const handleCerrarReserva = () => setModalOpen(false);
    const navigate = useNavigate();

    return(
        <>
            {esPropio ?
                <Button className="boton-redirigir" onClick={() => navigate(`/alojamientos/${alojamiento.id}`)}> Ver mi alojamiento </Button> :
                <Button className="boton-reservar" onClick={handleAbrirReserva}> Reservar </Button>
            }

            {!esPropio &&
                (
                    <FormularioReservaModal
                        isOpen={modalOpen}
                        onClose={handleCerrarReserva}
                        alojamiento={{
                            _id: alojamiento._id,
                            nombre: alojamiento.nombre,
                            precioPorNoche: alojamiento.precioPorNoche,
                            moneda: simboloMoneda[alojamiento.moneda],
                            cantidadMaximaHuespedes: alojamiento.cantidadMaximaHuespedes
                        }}
                    />
                )
            }
        </>
    )
};