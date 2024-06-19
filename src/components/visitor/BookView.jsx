import React from 'react'

import { Box, Grid, IconButton, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import BookCard from '../common/BookCard'

const BookView = ({ currentProducts, handlePrevPage, currentPage, handleNextPage, totalPages }) => {
    return (
        <>
            <Box sx={{ m: { xs: '18px auto', md: '50px auto' }, width: { xs: '90%', md: '80%' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {currentProducts.length !== 0 && <IconButton onClick={handlePrevPage} disabled={currentPage === 1} >
                    <ArrowBackIosIcon sx={{ fill: currentPage !== 1 && 'black', fontSize: '2.2rem' }} />
                </IconButton>}
                <Grid container spacing={2} justifyContent="center" sx={{ ml: 0 }}>
                    {currentProducts?.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <BookCard
                                bookId={product.id}
                                bookTitle={product.name}
                                bookDescription={product.description}
                                bookAuthor={product.author}
                                bookCategory={product.category}
                                bookPrice={product.price}
                                bookImage={product.image}
                                noCardAction={true}
                            />
                        </Grid>
                    ))}
                </Grid>
                {currentProducts.length !== 0 &&
                    <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <ArrowForwardIosIcon sx={{ fill: currentPage !== totalPages && 'black', fontSize: '2.2rem' }} />
                    </IconButton>}
            </Box>
            {currentProducts.length === 0 && <Box display='flex' justifyContent='center' mt={8}><Typography variant='h4' color='white' fontWeight='bold'>No Records</Typography></Box>}
        </>
    )
}

export default BookView