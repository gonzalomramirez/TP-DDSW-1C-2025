import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TerminosYCondiciones = () => {
    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
                Términos y Condiciones
            </Typography>

            <Typography variant="body1" gutterBottom>
                Bienvenido a Birbnb. Al utilizar nuestra plataforma, usted acepta cumplir con los siguientes términos y condiciones. Le recomendamos leerlos detenidamente antes de utilizar nuestros servicios.
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    1. Uso del sitio
                </Typography>
                <Typography variant="body1" gutterBottom>
                    El usuario se compromete a utilizar la plataforma únicamente con fines legales y de acuerdo con las normativas vigentes. Está prohibido el uso indebido, fraudulento o que pueda causar perjuicio a terceros.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    2. Reservas y pagos
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Las reservas realizadas a través de Birbnb están sujetas a disponibilidad y confirmación por parte de los anfitriones. Los pagos deberán realizarse según los métodos habilitados en la plataforma.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    3. Responsabilidad de los usuarios
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Los usuarios son responsables de la veracidad de la información proporcionada durante el registro y la realización de reservas. Birbnb no se responsabiliza por daños, pérdidas o incidentes ocurridos durante las estadías.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    4. Modificaciones
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Birbnb se reserva el derecho de modificar los presentes términos y condiciones en cualquier momento. Las modificaciones serán publicadas oportunamente en esta sección.
                </Typography>

                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                    5. Contacto
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Ante cualquier duda o consulta, puede contactarse con nuestro equipo de soporte a través de los canales habilitados en la plataforma.
                </Typography>
            </Box>
        </Container>
    );
};

export default TerminosYCondiciones;
