import { DialogActions, Button, CircularProgress } from '@mui/material';

const UserModalActions = ({
                              usuario, modo, loading, handleLogin, handleRegistro,
                              handleLogout, setModo, cerrarModal
                          }) => (
    <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: 1, p: 3 }}>
        {usuario ? (
            <Button variant="contained" color="error" fullWidth onClick={handleLogout}>
                Cerrar sesión
            </Button>
        ) : (
            <Button
                variant="contained"
                onClick={modo === 'login' ? handleLogin : handleRegistro}
                fullWidth
                disabled={loading}
            >
                {loading ? <CircularProgress size={22} color="inherit" /> : (
                    modo === 'login' ? 'Ingresar' : 'Registrarse'
                )}
            </Button>
        )}

        {!usuario && (
            <Button
                variant="text"
                onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
                fullWidth
            >
                {modo === 'login'
                    ? '¿No tenés cuenta? Registrate'
                    : '¿Ya tenés cuenta? Iniciá sesión'}
            </Button>
        )}

        <Button onClick={cerrarModal} size="small">
            Cancelar
        </Button>
    </DialogActions>
);

export default UserModalActions;
