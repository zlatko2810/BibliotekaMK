import React, { useEffect, useState } from 'react'

import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import BookCard from '../common/BookCard';
import CreateButton from '../common/CreateButton';
import OrderModal from './OrderModal';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { onBookResetChange } from '../../Redux/modules/books/actions';

const MyShop = ({ decodedToken }) => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))
    const mdBreakpoint = useMediaQuery(theme.breakpoints.down('md'))
    const lgBreakpoint = useMediaQuery(theme.breakpoints.up('lg'))

    const userEmail = decodedToken?.sub

    const productsPerPage = smBreakpoint ? 1 : mdBreakpoint ? 2 : 3;

    const [product, setShoppingCarts] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [openOrderModal, setOpenOrderModal] = useState(false)

    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);
    const bookState = useSelector((state) => state.books);
    const changeBooks = bookState.changeOnBook;
    const dispatch = useDispatch();

    const getShoppingCartByUser = async () => {
        try {
            const response = await axios.get('https://bibliotekamk-4931b6242b27.herokuapp.com/api/shopping-cart', {
                params: { email: userEmail },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${tokenFromRedux}`
                },
            });
            setShoppingCarts(response.data);
        } catch (error) {
            console.log('Error fetching shopping cart:', error);
        }
    };

    useEffect(() => {
        if (tokenFromRedux && userEmail) {
            getShoppingCartByUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromRedux, userEmail]);

    useEffect(() => {
        if (changeBooks) {
            getShoppingCartByUser();
            dispatch(onBookResetChange())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromRedux, changeBooks]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product?.products?.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(product?.products?.length / productsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {currentProducts?.length !== 0 &&
                <Box sx={{ width: '100%', textAlign: 'center', mt: mdBreakpoint ? 1 : 2, mb: mdBreakpoint && '-10px' }}>
                    <CreateButton width={'250px'} marginRight={lgBreakpoint ? '30px' : smBreakpoint && '-16px'} text='Order Book(s)' handleCreate={() => setOpenOrderModal(true)} />
                </Box>}
            <Box sx={{ m: { xs: '18px auto', md: '20px auto' }, width: { xs: '90%', md: '80%' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {currentProducts?.length !== 0 && <IconButton onClick={handlePrevPage} disabled={currentPage === 1} >
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
                                userType={decodedToken?.userRole[0].authority}
                                userEmail={decodedToken?.sub}
                                shop={true}
                            />
                        </Grid>
                    ))}
                </Grid>
                {currentProducts?.length !== 0 &&
                    <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <ArrowForwardIosIcon sx={{ fill: currentPage !== totalPages && 'black', fontSize: '2.2rem' }} />
                    </IconButton>}
            </Box>

            {currentProducts?.length === 0 && <Box display='flex' justifyContent='center' mt={8}><Typography variant='h3' textAlign='center' color='white' fontWeight='bold'>You have no books in shopping card</Typography></Box>}
            {openOrderModal && <OrderModal openOrderModal={openOrderModal} setOpenOrderModal={setOpenOrderModal} currentProducts={product?.products} userEmail={decodedToken?.sub} />}
        </>
    )
}

export default MyShop