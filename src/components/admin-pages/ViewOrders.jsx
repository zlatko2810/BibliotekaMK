import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';

const ViewOrders = () => {

    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);
    const theme = useTheme()
    const lgBreakpoint = useMediaQuery(theme.breakpoints.up('lg'))
    const [orders, setOrders] = useState([])


    const getUserOrders = async () => {
        try {
            const response = await axios.get('https://bibliotekamk-4931b6242b27.herokuapp.com/api/orders', {
                headers: {
                    'Authorization': `Bearer ${tokenFromRedux}`,
                },
            });
            setOrders(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (tokenFromRedux) {
            getUserOrders()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromRedux])

    const columns = [
        { field: 'orderId', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'date', headerName: 'Date of order', width: 130 },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 130,
        },
        { field: 'status', headerName: 'Status', width: 130 },
    ];

    const rows = orders.map((order) => ({
        id: order.orderId,
        orderId: order.orderId,
        email: order.email,
        date: order.date,
        price: order.price,
        status: order.status,
    }));

    return (
        <Box sx={{ paddingY: { xs: '1.5%', md: '3%' }, paddingX: lgBreakpoint ? '7%' : '2%' }}>
            <Box sx={{ background: '#00000099', padding: { xs: '5px 0', md: '20px 35px' }, borderRadius: '24px' }}>
                <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 3 } }}>
                    <Typography variant='h4' sx={{ color: 'white', fontWeight: 'bold', }}>Orders</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[4]}
                        checkboxSelection
                        sx={{ width: lgBreakpoint ? '60%' : '100%', margin: '0 auto', color: 'green', background: 'white' }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ViewOrders