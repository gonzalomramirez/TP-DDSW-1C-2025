import {useFiltroContext} from "../../../../shared/context/FiltroContext";
import {Box, Button} from "@mui/material";

export const Paginador = () => {
    const {paginaActual, setPaginaActual, hayProximaPagina} = useFiltroContext()

    return (
        <>
            <Box className="paginador">
                <Button
                    disabled={paginaActual === 1}
                    onClick={() => setPaginaActual(paginaActual - 1)}
                >
                    Anterior
                </Button>

                <Button
                    disabled={!hayProximaPagina}
                    onClick={() => setPaginaActual(paginaActual + 1)}
                >
                    Siguiente
                </Button>
            </Box>
        </>
    )
}