import React from 'react';

import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';


const Footer = () => {

    return (
        <Box component="footer" sx={{ background: '#ffc251', color: 'white', pt: 1, position: 'fixed', width: '100%', bottom: 0 }}>
            <Container maxWidth="lg">
                <Grid item xs={12} sm={4} width='100%'>
                    <Box display='flex' justifyContent='center'>
                        <IconButton
                            sx={{ px: 1, py: 0 }}
                            color="inherit"
                            aria-label="Facebook"
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Facebook />
                        </IconButton>
                        <IconButton
                            sx={{ px: 1, py: 0 }}
                            color="inherit"
                            aria-label="Twitter"
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Twitter />
                        </IconButton>
                        <IconButton
                            sx={{ px: 1, py: 0 }}
                            color="inherit"
                            aria-label="Instagram"
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram />
                        </IconButton>
                        <IconButton
                            sx={{ px: 1, py: 0 }}
                            color="inherit"
                            aria-label="LinkedIn"
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedIn />
                        </IconButton>
                    </Box>
                </Grid>
                <Typography variant="body2" color="inherit" align="center" sx={{ mt: 1 }}>
                    &copy; {new Date().getFullYear()} БиблиотекаМК. All rights reserved.
                </Typography>
            </Container>
        </Box >
    );
};

export default Footer;
