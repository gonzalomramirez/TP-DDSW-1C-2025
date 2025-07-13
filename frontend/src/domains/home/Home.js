import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

const imagen = "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=2072&auto=format&fit=crop";

const Home = () => {
    const navigate = useNavigate();

    const handleBuscar = () => {
        navigate('/alojamientos?cantidadMaximaHuespedes=1&moneda=PESO_ARG&cantidadHuespedes=1');
    };

    return (
        <Box>
            <Box className="banner-principal" style={{ backgroundImage: `url(${imagen})` }}>
                <Container className="contenido-banner">
                    <Typography variant="h2" className="titulo-banner">
                        Escapate con Birbnb
                    </Typography>
                    <Typography variant="h5" className="subtitulo-banner">
                        Reservá alojamientos únicos en cualquier parte del mundo.
                    </Typography>
                    <Button variant="contained" size="large" color="secondary" onClick={handleBuscar} sx={{mt:2}}>
                        Buscar alojamientos
                    </Button>
                </Container>
            </Box>

            <Box className="seccion-beneficios">
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <Box className="beneficio">
                                <Typography variant="h6">🏡 Alojamientos únicos</Typography>
                                <Typography>Desde cabañas en la montaña hasta casas frente al mar.</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box className="beneficio">
                                <Typography variant="h6">🔒 Reservas seguras</Typography>
                                <Typography>Tu información está protegida en cada paso del proceso.</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box className="beneficio">
                                <Typography variant="h6">💬 Atención personalizada</Typography>
                                <Typography>Estamos para ayudarte antes, durante y después de tu estadía.</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;