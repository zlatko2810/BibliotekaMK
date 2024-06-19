import React, { useEffect, useState } from 'react';

import { Avatar, Box, IconButton, Link, Menu, MenuItem, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../Redux/modules/accessToken/actions';

const AdminNav = ({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu, setSuccessLogout, setOpenLogout }) => {

    const theme = useTheme()
    const mdBreakpoint = useMediaQuery(theme.breakpoints.up('md'))
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();

    const [activePage, setActivePage] = useState(location.pathname);

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    const handleNavigate = (path) => {
        navigate(path);
        setActivePage(path);
    };

    const adminNavItems = [
        { item: 'Add Author', path: '/home/add-author' },
        { item: 'Add Category', path: '/home/add-category' },
        { item: 'Add Product', path: '/home/add-product' },
        { item: 'Add PDF', path: '/home/add-pdf' },
    ];

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
        { item: 'Add Author', navigate: '/home/add-author' },
        { item: 'Add Category', navigate: '/home/add-category' },
        { item: 'Add Product', navigate: '/home/add-product' },
        { item: 'Add PDF', navigate: '/home/add-pdf' },
        { item: 'View orders', navigate: '/home/orders' },
        { item: 'Log out', onClick: handleLogOut }
    ];

    const settingsMobile = [
        { item: 'View orders', navigate: '/home/orders' },
        { item: 'Log out', onClick: handleLogOut },
    ];

    const mobileView = mdBreakpoint ? settingsMobile : settings
    return (
        <>
            <Box sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }}>
                {adminNavItems.map((item, index) => (
                    <Tooltip title={item.item} key={index}>
                        <Link
                            key={index}
                            sx={{
                                cursor: 'pointer',
                                color: activePage === item.path ? 'green' : 'white',
                                fontWeight: activePage === item.path && 'bold',
                                mr: 2,
                                textDecoration: 'none',
                                // width: '110px',
                                textAlign: 'center'
                            }}
                            onClick={() => handleNavigate(item.path)}
                        >
                            {item.item}
                        </Link>
                    </Tooltip>
                ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                        <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
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

                    {mobileView.map((setting, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                if (setting.onClick) {
                                    setting.onClick();
                                } else {
                                    navigate(setting.navigate);
                                }
                                handleCloseUserMenu();
                            }}
                        >
                            <Typography textAlign="center">{setting.item}</Typography>
                        </MenuItem>
                    ))
                    }

                </Menu>
            </Box>
        </>
    )
}

export default AdminNav;
