import React, { useContext, useEffect, useState } from 'react'

import { AppBar, Avatar, Box, CardMedia, Container, FormControlLabel, IconButton, Menu, MenuItem, Switch, Toolbar, Tooltip, Typography, createTheme, useMediaQuery } from '@mui/material'

import Logo from '../../LogoBook.png'
import { MainSearch } from './MainSearch';
import UserNav from './UserNav';
import AdminNav from './AdminNav';
import SelectCategory from './SelectCategory';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../Redux/modules/accessToken/actions';
import { useSelector } from 'react-redux'
import { fetchCategories } from '../../ApiUtils/Category';
import { UserInfoContext } from '../../contexts/UserInfoContext'

const NavBarComponent = ({ searchTerm, setSearchTerm, setCategoryCardS, setSuccessLogout, setOpenLogout, decodedToken, categoryCards, handleChangeCategory }) => {

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
    const { userInfo } = useContext(UserInfoContext);

    const navigate = useNavigate()
    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [checked, setChecked] = useState(true);
    const [category, setCategory] = useState([])

    const userType = decodedToken?.userRole[0].authority
    const location = useLocation()
    const dispatch = useDispatch();

    const handleLogOut = () => {
        setSuccessLogout('You are successfully logout')
        setOpenLogout(true)
        setTimeout(() => {
            dispatch(setAccessToken(null));
            localStorage.removeItem('token');
            navigate('/');
        }, 2500);
    }

    const settings = [
        { userItem: 'My profile', function: () => navigate('/home/my-profile') },
        { userItem: 'Logout', function: handleLogOut }
    ];

    const settingsMobile = [
        { userItem: 'Shopping cart', function: () => navigate('/home/my-shop') },
        { userItem: 'Subscription', function: () => navigate('/home/subscribe') },
        { userItem: 'My profile', function: () => navigate('/home/my-profile') },
        { userItem: 'Logout', function: handleLogOut },
    ];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const loadCategories = async () => {
        try {
            const response = await fetchCategories(tokenFromRedux);
            setCategory(response.data);
        } catch (error) {
            console.log('Failed to get authors', error)
        }
    };

    useEffect(() => {
        if (tokenFromRedux && !checked) {
            loadCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromRedux, checked]);

    useEffect(() => {
        if (checked) {
            setCategoryCardS(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    const setingsRender = smBreakpoint ? settings : settingsMobile

    return (
        <AppBar position="static" sx={{ background: '#ffc251' }}>
            <Container maxWidth="xl" sx={{ px: xsBreakpoint ? '8px !important' : !smBreakpoint && '12px !important' }} >
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ minWidth: { xs: 'auto', md: '420px ' } }}>
                        <CardMedia
                            component="img"
                            image={Logo}
                            onClick={() => navigate('/home')}
                            alt="Logo Image"
                            sx={{ width: xsBreakpoint ? 75 : 100, height: xsBreakpoint ? 40 : 50, objectFit: 'contain', cursor: 'pointer' }}
                        />
                    </Box>
                    {location.pathname === '/home' &&
                        <Box sx={{ width: '100%', px: 2, textAlign: 'center', display: 'flex', flex: 0, alignItems: 'center' }}>
                            {checked ? <MainSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} xsBreakpoint={xsBreakpoint} /> : <SelectCategory options={category} value={categoryCards} handleChange={handleChangeCategory} />}
                            <FormControlLabel sx={{ ml: 1, width: { xs: xsBreakpoint ? '40px' : '60px', md: '100px', lg: '190px' } }} control={
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                />} label={smBreakpoint && (checked ? "Search" : "Filter by category")} />
                        </Box>}
                    <Box display='flex' alignItems='center' justifyContent='end' sx={{ minWidth: { xs: 'auto', md: '420px' } }}>
                        {userType === 'ADMIN' ?
                            <AdminNav setOpenLogout={setOpenLogout} setSuccessLogout={setSuccessLogout} handleOpenUserMenu={handleOpenUserMenu} anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu} /> :
                            <>
                                {smBreakpoint && <UserNav />}
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                                            <Avatar alt={`${userInfo?.firstName} ${userInfo?.lastName}`} src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {setingsRender.map((setting, index) => (
                                            <MenuItem key={index}
                                                onClick={() => {
                                                    if (setting.function) {
                                                        setting.function();
                                                    }
                                                    handleCloseUserMenu();
                                                }}>
                                                <Typography textAlign="center">{setting.userItem}</Typography>
                                            </MenuItem>))}
                                    </Menu>
                                </Box>
                            </>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default NavBarComponent