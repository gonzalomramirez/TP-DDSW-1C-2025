import React from 'react';
import './Footer.css';
import { Typography, Link, IconButton, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';

const Footer = () => {
    return (
        <Box component="footer" className="footer-container">
            <Box className="footer-content">
                <Box className="footer-left">
                    <Typography variant="body2" className="footer-text">© 2025 Birbnb, Inc.</Typography>
                    <Link href="/privacidad" underline="hover" color="inherit" className="footer-link">Privacidad</Link>
                    <Link href="/terminos" underline="hover" color="inherit" className="footer-link">Términos</Link>
                    <Link href="/mapa" underline="hover" color="inherit" className="footer-link">Mapa del sitio</Link>
                </Box>

                <Box className="footer-right">
                    <Box className="footer-language">
                        <LanguageIcon fontSize="small" />
                        <Typography variant="body2" className="footer-text">Español (AR)</Typography>
                    </Box>

                    <IconButton size="small" href="https://instagram.com/birbnb_arg" target="_blank" aria-label="Instagram">
                        <InstagramIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" href="https://x.com/birbnb_oficial" target="_blank" aria-label="X">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" href="https://www.facebook.com/groups/departamentosventa" target="_blank" aria-label="Facebook">
                        <FacebookIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
