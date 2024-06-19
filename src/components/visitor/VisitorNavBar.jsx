import React, { useEffect, useState } from 'react'
import { AppBar, Box, CardMedia, Container, FormControlLabel, Switch, Toolbar, createTheme, useMediaQuery } from '@mui/material'

import { MainSearch } from '../navbar/MainSearch'
import VisitorNavItems from './VisitorNavItems';
import Logo from '../../../src/LogoBook.png'

import { useLocation, useNavigate } from 'react-router-dom'
import SelectCategory from '../navbar/SelectCategory';
import { fetchCategories } from '../../ApiUtils/Category';

const VisitorNavBar = ({ setCategoryCardS, categoryCards, handleChangeCategory, searchTerm, setSearchTerm }) => {

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 376,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    });
    const smBreakpoint = useMediaQuery(theme.breakpoints.up('sm'))
    const xsBreakpoint = useMediaQuery(theme.breakpoints.down('xs'))
    const [checked, setChecked] = useState(true);
    const [category, setCategory] = useState([])

    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const loadCategories = async () => {
        try {
            const response = await fetchCategories();
            setCategory(response.data);
        } catch (error) {
            console.log('Log fetch', error);
        }
    };

    useEffect(() => {
        if (!checked) {
            loadCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    useEffect(() => {
        if (checked) {
            setCategoryCardS(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);


    return (
        <AppBar position="static" sx={{ background: '#ffc251' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ minWidth: { xs: 'auto', md: '420px ' } }}>
                        <CardMedia
                            component="img"
                            image={Logo}
                            onClick={() => navigate('/')}
                            alt="Logo Image"
                            sx={{ width: { xs: 65, md: 100 }, height:  { xs: 41, md: 50 }, objectFit: 'cover', cursor: 'pointer' }}
                        />
                    </Box>
                    {location.pathname === '/' &&
                        <Box sx={{ width: '100%', px: 2, textAlign: 'center', display: 'flex', flex: 0, alignItems: 'center' }}>
                            {checked ? <MainSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} xsBreakpoint={xsBreakpoint} /> : <SelectCategory options={category} value={categoryCards} handleChange={handleChangeCategory} />}
                            <FormControlLabel sx={{ ml: 1, width: { xs: xsBreakpoint ? '40px' : '60px', md: '100px', lg: '190px' } }} control={
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                />} label={smBreakpoint && (checked ? "Search" : "Filter by category")} />
                        </Box>}
                    <Box display='flex' alignItems='center' justifyContent='end' sx={{ minWidth: { xs: 'auto', md: '420px' } }}>
                        <VisitorNavItems />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default VisitorNavBar