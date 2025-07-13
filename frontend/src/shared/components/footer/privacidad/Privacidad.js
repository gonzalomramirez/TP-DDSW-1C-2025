import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PoliticaDePrivacidad = () => {
    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
                Política de Privacidad
            </Typography>

            <Typography variant="body1" gutterBottom>
                En Birbnb valoramos su privacidad. La presente política describe cómo recopilamos, utilizamos y protegemos su información personal.
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    1. Información recopilada
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Recopilamos datos personales proporcionados durante el registro, la reserva de alojamientos y el uso de nuestra plataforma, incluyendo nombre, correo electrónico, teléfono, datos de pago y preferencias de viaje.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    2. Uso de la información
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Utilizamos la información recopilada para procesar reservas, mejorar nuestros servicios, comunicarnos con los usuarios y personalizar la experiencia en la plataforma.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    3. Protección de datos
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Adoptamos medidas de seguridad técnicas y organizativas para proteger los datos personales de accesos no autorizados, pérdidas o usos indebidos.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    4. Compartir información
                </Typography>
                <Typography variant="body1" gutterBottom>
                    No compartimos información personal con terceros, salvo que sea necesario para la prestación del servicio o requerido por ley.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    5. Derechos del usuario
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Los usuarios pueden acceder, rectificar o solicitar la eliminación de sus datos personales contactándose con nuestro equipo de soporte.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    6. Cambios en la política
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Birbnb se reserva el derecho de modificar esta política de privacidad en cualquier momento. Las actualizaciones estarán disponibles en esta sección.
                </Typography>
            </Box>
        </Container>
    );
};

export default PoliticaDePrivacidad;
