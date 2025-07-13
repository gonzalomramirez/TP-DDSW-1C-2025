import {
    DialogContent, Stack, Alert, TextField,
    Typography, ToggleButtonGroup, ToggleButton
} from '@mui/material';

const UserModalContent = ({
                              usuario, modo, error, success,
                              email, setEmail, nombre, setNombre,
                              tipoUsuario, setTipoUsuario
                          }) => (
    <DialogContent>
        <Stack spacing={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            {usuario ? (
                <Typography align="center">
                    Iniciaste sesión como <strong>{usuario.email}</strong>
                </Typography>
            ) : (
                <>
                    {modo === 'registro' && (
                        <TextField
                            label="Nombre"
                            fullWidth
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    )}
                    <TextField
                        label="Email"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {modo === 'registro' && (
                        <>
                            <Typography variant="subtitle2" sx={{ mt: 1 }}>
                                Tipo de usuario
                            </Typography>
                            <ToggleButtonGroup
                                value={tipoUsuario}
                                exclusive
                                onChange={(e, val) => val && setTipoUsuario(val)}
                                fullWidth
                            >
                                <ToggleButton value="HUESPED">Huésped</ToggleButton>
                                <ToggleButton value="ANFITRION">Anfitrión</ToggleButton>
                            </ToggleButtonGroup>
                        </>
                    )}
                </>
            )}
        </Stack>
    </DialogContent>
);

export default UserModalContent;
