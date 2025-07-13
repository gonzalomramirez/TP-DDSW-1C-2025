import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./domains/home/Home";
import Header from "./shared/components/header/Header";
import Footer from "./shared/components/footer/Footer";
import BuscarAlojamientos from "./domains/alojamientos/pages/buscarAlojamiento/BuscarAlojamientos";
import TerminosYCondiciones from "./shared/components/footer/terminosCondiciones/TerminosYCondiciones";
import Privacidad from "./shared/components/footer/privacidad/Privacidad";
import MapaDelSitio from "./shared/components/footer/mapaDelSitio/MapaDelSitio";
import {Box} from "@mui/material";
import { PanelAnfitrion } from "./domains/usuarios/pages/panelAnfitrion/PanelAnfitrion";
import {FiltroProvider} from "./shared/context/FiltroContext";
import DetalleAlojamiento from "./domains/alojamientos/pages/detalleAlojamiento/DetalleAlojamiento";
import { AuthProvider } from "./shared/context/AuthContext";
import MisReservas from "./domains/reservas/pages/misReservas/MisReservas";
import './App.css';
import {AnfitrionProvider} from "./shared/context/AnfitrionContext";
import {ReservaProvider} from "./shared/context/ReservasContext";
import {UsuarioProvider} from "./shared/context/UsuarioContext";

function App() {
    return (
        <AuthProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Router>
                    <FiltroProvider>
                        <UsuarioProvider><Header /></UsuarioProvider>
                        <Box className="app-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/alojamientos" element={<BuscarAlojamientos/> } />
                                <Route path="/terminos" element={<TerminosYCondiciones />} />
                                <Route path="/privacidad" element={<Privacidad />} />
                                <Route path="/mapa" element={<MapaDelSitio />} />
                                <Route path="/usuarios/:id/alojamientos" element={ <ReservaProvider><AnfitrionProvider> <PanelAnfitrion/> </AnfitrionProvider> </ReservaProvider>} />
                                <Route path="/alojamientos/:id" element={ <AnfitrionProvider> <DetalleAlojamiento /> </AnfitrionProvider> } />
                                <Route path="/usuarios/:id/reservas" element={<ReservaProvider> <MisReservas /> </ReservaProvider>} />
                            </Routes>
                        </Box>
                    </FiltroProvider>
                    <Footer />
                </Router>
            </Box>
        </AuthProvider>
    );
}


export default App;