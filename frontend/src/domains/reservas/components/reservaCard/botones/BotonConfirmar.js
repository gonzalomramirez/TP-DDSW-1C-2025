import {Button} from "@mui/material";
import {useReservaContext} from "../../../../../shared/context/ReservasContext";

export const BotonConfirmar = ({reserva}) => {
    const {handleConfirmarReserva} = useReservaContext();

    return (
        <Button
            variant="outlined"
            color="success"
            onClick={() => {
                handleConfirmarReserva(reserva)
                window.location.reload()
            }}
            className="botones"
        >
            Confirmar
        </Button>
    )
}