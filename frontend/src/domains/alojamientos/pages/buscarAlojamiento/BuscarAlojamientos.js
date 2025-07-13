import React, { useState } from 'react';
import {AlojamientoCardHuesped} from "../../components/alojamientoCard/huesped/AlojamientoCardHuesped";
import PanelFiltros from "../../components/panelFiltros/PanelFiltros";
import {Grid, Container, Typography, Box, Button, Dialog, DialogContent} from '@mui/material';
import { useFiltroContext } from "../../../../shared/context/FiltroContext";
import './BuscarAlojamiento.css';
import {Paginador} from "../../components/paginador/Paginador";
import {Loader} from "../../../../shared/components/loader/Loader";

const BuscarAlojamientos = () => {
    const { alojamientos, loading,} = useFiltroContext();
    const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

    return (
        <Container maxWidth="xl" className="contenedor-busqueda">

            <Typography variant="h4" gutterBottom>
                Resultados de búsqueda
            </Typography>

            <Box className="boton-filtros-mobile">
                <Button variant="outlined" onClick={() => setFiltrosAbiertos(true)}> Filtrar </Button>
            </Box>

            <Box className="layout-busqueda">
                <Box className="panel-filtros-escritorio"> <PanelFiltros /> </Box>
                <Box className="contenedor-cards">
                    <Grid container spacing={3} justifyContent="center" className={loading ? "loader-container" : ""}>
                        {loading ? ( <Loader/> ) : alojamientos.length === 0 ? (
                            <Box className="mensaje-sin-resultados">
                                <Typography variant="h6" color="textSecondary">
                                    No hay resultados para tu búsqueda.
                                </Typography>
                            </Box>
                        ) : (
                            alojamientos.map((aloj, index) => (
                                <Grid key={index} item xs={12} sm={6} md={4}>
                                    <AlojamientoCardHuesped alojamiento={aloj}/>
                                </Grid>
                            ))
                        )}
                    </Grid>
                    <Paginador/>
                </Box>
            </Box>

            <Dialog open={filtrosAbiertos} onClose={() => setFiltrosAbiertos(false)} fullWidth maxWidth="sm">
                <DialogContent>
                    <PanelFiltros onClose={() => setFiltrosAbiertos(false)} />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default BuscarAlojamientos;