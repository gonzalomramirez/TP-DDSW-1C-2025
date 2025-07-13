import { DialogTitle } from '@mui/material';

const UserModalTitle = ({ usuario, modo }) => (
    <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
        {usuario
            ? `¡Hola, ${usuario.nombre}!`
            : modo === 'login'
                ? 'Bienvenido de nuevo'
                : 'Creá tu cuenta'}
    </DialogTitle>
);

export default UserModalTitle;
