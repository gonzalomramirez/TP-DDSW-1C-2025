import IosShareIcon from '@mui/icons-material/IosShare';
import React from "react";
import "../DetalleAlojamiento.css"

export const BotonCompartir = ({ alojamiento }) => (
    <IosShareIcon
        className="icono-compartir"
        onClick={(e) => {
            e.stopPropagation();
            const url = `${window.location.origin}/alojamientos/${alojamiento._id}`;
            if (navigator.share) {
                navigator.share({
                    title: alojamiento.nombre,
                    text: '¡Mirá este alojamiento en Birbnb!',
                    url,
                }).catch(console.error);
            } else {
                navigator.clipboard.writeText(url)
                    .then(() => alert('Enlace copiado al portapapeles 📋'))
                    .catch(err => alert('No se pudo copiar el enlace'));
            }
        }}
    />
);
