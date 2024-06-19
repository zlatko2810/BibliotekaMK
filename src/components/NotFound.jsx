import React from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ background: 'grey', padding: '20px', borderRadius: '24px' }} >
                <Typography variant='h1' sx={{ color: '#010101', }}>404 - Not Found</Typography>
                <Typography variant='h4' sx={{ color: '#010101', }}>The page you are looking for does not exist.
                    <Link style={{ fontWeight: 'bold', color: 'blue' }} to="/" >Go back to login page</Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default NotFound