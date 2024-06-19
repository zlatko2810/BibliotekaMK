import React, { useEffect, useState } from 'react'

import { Box, Button, Tooltip } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

import { useLocation, useNavigate } from 'react-router-dom'

const UserNav = () => {

    const location = useLocation();
    const [activePage, setActivePage] = useState(location.pathname);

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    const handleNavigate = (path) => {
        navigate(path);
        setActivePage(path);
    };

    const navIcons = [
        { icon: <AddShoppingCartIcon />, tooltip: 'Shopping cart', path: '/home/my-shop' },
        { icon: <SubscriptionsIcon />, tooltip: 'Subscribe', path: '/home/subscribe' },
    ];

    const navigate = useNavigate()
    
    return (
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
            {navIcons.map((icon, index) => (
                <Button
                    key={index}
                    onClick={() => handleNavigate(icon.path)}
                    sx={{ my: 2, color: activePage === icon.path ? 'green' : 'white', display: 'flex', minWidth: 5 }}
                >
                    <Tooltip title={icon.tooltip}>
                        {icon.icon}
                    </Tooltip>
                </Button>
            ))
            }
        </Box >
    )
}

export default UserNav