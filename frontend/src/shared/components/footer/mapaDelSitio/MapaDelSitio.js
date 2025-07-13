import React from 'react';
import { Container, Typography, Box, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from '../../../../assets/logo.png';

const MapaDelSitio = () => {
    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
                Mapa del Sitio
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight={600} gutterBottom>
                Navegación principal
            </Typography>
            <Box sx={{ ml: 3, mb: 3 }}>
                <Link component={RouterLink} to="/" underline="hover" color="primary">
                    <HomeIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Inicio
                </Link><br />

                <Link component={RouterLink} to="/alojamientos" underline="hover" color="primary">
                    <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Buscar Alojamientos
                </Link><br />

                <Link component={RouterLink} to="/perfil" underline="hover" color="primary">
                    <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Mi Perfil
                </Link>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight={600} gutterBottom>
                Información Legal
            </Typography>
            <Box sx={{ ml: 3, mb: 3 }}>
                <Link component={RouterLink} to="/terminos" underline="hover" color="primary">
                    <GavelIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Términos y Condiciones
                </Link><br />

                <Link component={RouterLink} to="/privacidad" underline="hover" color="primary">
                    <PrivacyTipIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Política de Privacidad
                </Link>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight={600} gutterBottom>
                Contacto
            </Typography>
            <Box sx={{ ml: 3 }}>
                <Link href="mailto:soporte@birbnb.com" underline="hover" color="primary">
                    <EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> soporte@birbnb.com
                </Link> <br />

                <Link href="https://instagram.com/birbnb_arg" underline="hover" color="primary">
                    <InstagramIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Seguinos en Instagram!
                </Link>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        width: '170px',
                        height: 'auto',
                        opacity: 0.8
                    }}
                />
            </Box>

        </Container>
    );
};

export default MapaDelSitio;