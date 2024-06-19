import React, { useState, useEffect } from 'react'
import { Avatar, Box, IconButton, Link, Menu, MenuItem, Tooltip, Typography, useMediaQuery, useTheme, } from '@mui/material'

import SuccessButton from '../common/SuccessButton'

import { useNavigate, useLocation } from 'react-router-dom'


const VisitorNavItems = () => {

    const theme = useTheme()
    const mdBreakpoint = useMediaQuery(theme.breakpoints.up('md'))
    const navigate = useNavigate()
    const location = useLocation();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [activePage, setActivePage] = useState(location.pathname);

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    const handleNavigate = (path) => {
        navigate(path);
        setActivePage(path);
    };

    const settings = [
        { userItem: 'About us', path: '/about-us' },
        { userItem: 'Contact', path: '/contact' },
    ];

    const settingsMobile = [
        { userItem: 'About us', function: () => navigate('/about-us') },
        { userItem: 'Contact ', function: () => navigate('/contact') },
        { userItem: 'Go to Login ', function: () => navigate('/login') }
    ];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {mdBreakpoint ?
                <>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                        {settings.map((setting, index) => (
                            <Link
                                key={index}
                                sx={{
                                    cursor: 'pointer',
                                    color: activePage === setting.path ? 'green' : 'white',
                                    fontWeight: activePage === setting.path && 'bold',
                                    mr: 2,
                                    textDecoration: 'none',
                                }}
                                onClick={() => handleNavigate(setting.path)}
                            >
                                {setting.userItem}
                            </Link>
                        ))}
                    </Box>
                    <SuccessButton successButtonName='Go to Login' bgcolor='green' handleSuccessClick={() => navigate('/login')} />
                </>
                :
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                            <Avatar alt="O" src="/static/images/avatar/2.jpg" />
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
                        {settingsMobile.map((setting, index) => (
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
            }
        </Box >
    )
}

export default VisitorNavItems