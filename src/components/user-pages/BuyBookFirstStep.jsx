import React, { useEffect, useState } from 'react'

import { Box, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

import SuccessButton from '../common/SuccessButton'


const BuyBookFirstStep = ({ currentProducts, setActiveStep, setQuantities, quantities }) => {

    const theme = useTheme()
    const mdBreakpoint = useMediaQuery(theme.breakpoints.up('md'))
    
    const initialPrices = currentProducts.reduce((acc, book) => {
        acc[book.id] = book.price;
        return acc;
    }, {});

    const [prices, setPrices] = useState(initialPrices);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleQuantityChange = (book, value) => {
        const quantity = parseInt(value, 10) || 0;
        const updatedQuantities = {
            ...quantities,
            [book.id]: quantity
        };
        const updatedPrices = {
            ...prices,
            [book.id]: quantity * book.price
        };
        setQuantities(updatedQuantities);
        setPrices(updatedPrices);
    };

    useEffect(() => {
        const newTotalPrice = currentProducts.reduce((total, book) => {
            return total + (quantities[book.id] * book.price);
        }, 0);
        setTotalPrice(newTotalPrice);
    }, [quantities, currentProducts]);


    return (
        <>
            {currentProducts.map((book, index) => (
                <Box key={index} display='flex' alignItems='center' justifyContent='space-between' marginBottom={2}>
                    <Typography minWidth={mdBreakpoint ? '120px' : '90px'} marginRight={2}>{book.name}</Typography>
                    <TextField
                        id={`quantity-${index}`}
                        label="Quantity"
                        type='number'
                        value={quantities[book.id]}
                        size="small"
                        sx={{ width: '100px' }}
                        onChange={(event) => handleQuantityChange(book, event.target.value)}
                    />
                    <TextField
                        id={`price-${index}`}
                        label="Price"
                        type='number'
                        value={prices[book.id]}
                        size="small"
                        sx={{ width: '100px' }}
                        disabled
                    />
                </Box>
            ))}
            <Box display='flex' justifyContent='flex-end' alignItems='center' marginTop={2}>
                <Typography variant="h6">Total Price of All Books: ${totalPrice.toFixed(2)}</Typography>
            </Box>
            <SuccessButton handleSuccessClick={() => setActiveStep(2)} successButtonName='Buy' bgcolor='green' width='100%' />
        </>

    )
}

export default BuyBookFirstStep