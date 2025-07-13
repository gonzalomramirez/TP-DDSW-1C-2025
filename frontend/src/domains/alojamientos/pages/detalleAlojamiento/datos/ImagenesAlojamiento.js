import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { Box } from "@mui/material";
import {BotonCompartir} from "./BotonCompartir";

export const ImagenesAlojamiento = ({ alojamiento }) => {
    if (!alojamiento?.fotos || alojamiento.fotos.length === 0) return null;

    return (
        <Box className="contenedor-imagen-principal">
            <Swiper spaceBetween={10} slidesPerView={1} className="carrusel-imagenes">
                {alojamiento.fotos.map((foto, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={foto.trim()}
                            alt={`Imagen ${i + 1}`}
                            className="imagen-carrusel"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <BotonCompartir alojamiento={alojamiento} />
        </Box>
    );
};
