import {Button} from "@mui/material";

export const BotonCancelar = ({setMostrarMotivo, anfitrion}) => {
    return (
        <Button
            variant="contained"
            color="error"
            onClick={(e) => {
                setMostrarMotivo(true)
                e.stopPropagation()
            }}
            className="botones"
        >
            {anfitrion ? "Rechazar" : "Cancelar"}
        </Button>
    )
}