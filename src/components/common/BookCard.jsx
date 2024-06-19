import React, { useState } from 'react';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import LevelBox from './LevelBox';
import BuyBookModal from '../user-pages/BuyBookModal';
import EditBookModal from '../admin-pages/EditBookModal';
import DeleteIconButton from './DeleteIconButton';
import EditIconButton from './EditIconButton';
import SuccessSnackBar from './SuccessSnackBar';
import ErrorSnackBar from './ErrorSnackBar';
import DeleteBookModal from '../admin-pages/DeleteBookModal';
import RemoveFromShopList from '../user-pages/RemoveFromShopList';

import { useSelector } from 'react-redux';
import { addProductToShoppingCart } from '../../ApiUtils/Order';
import axios from 'axios';

const StyledTypography = styled(Typography)`
    max-height: 64px;
    min-height: 64px;
    overflow-y: auto;

    /* Custom scrollbar styles */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
        border: 2px solid #f1f1f1;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
`;

const BookCard = ({ bookTitle, bookDescription, bookImage, bookId, userType, bookAuthor, bookCategory, bookPrice, noCardAction, userEmail, shop }) => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))
    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);
    const [openBuyModal, setOpenBuyModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openRemoveModal, setOpenRemoveModal] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);

    const handleEdit = () => {
        setOpenEditModal(true)
    };

    const handleOpenDelete = () => {
        setOpenDeleteModal(true)
    };

    const handleOpenRemove = () => {
        setOpenRemoveModal(true)
    };

    const onCloseSuccess = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenSuccess(false);
    };

    const onCloseError = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenError(false);
    };

    const handleAddProductToShoppingCart = async () => {
        try {
            const response = await addProductToShoppingCart(bookId, userEmail, tokenFromRedux);
            setSuccessMessage(response.data);
            setOpenSuccess(true)
        } catch (error) {
            setError('Error adding product to shopping cart');
            console.log('Error:', error);
        }
    };

    const downloadPdf = async () => {
        try {
            const response = await axios.get(`https://bibliotekamk-4931b6242b27.herokuapp.com/api/document/download?productId=${bookId}`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${tokenFromRedux}`
                }
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
    
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
            if (isIOS) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    const link = document.createElement('a');
                    link.href = reader.result;
                    link.download = `document_${bookId}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
                reader.readAsDataURL(blob);
            } else {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `document_${bookId}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.log('Error downloading document:', error);
        }
    };
    

    return (
        <>
            <Card sx={{ background: '#ffc251', maxWidth: { xs: 300, md: 300 }, border: '3px solid white', mt: userType === 'ADMIN' && 3 }}>
                <Box position="relative">
                    <CardMedia
                        sx={{ height: { xs: 120, md: 130, lg: 170 }, backgroundSize: 'contain' }}
                        image={`data:image/jpeg;base64,${bookImage}`}
                        title="Book Image"
                    />
                    {userType === 'ADMIN' &&
                        <Box position="absolute" top={8} display='flex' sx={{ width: '100%', justifyContent: 'space-between' }}>
                            <DeleteIconButton onClick={() => handleOpenDelete(true)} tooltip='Delete book' />
                            <EditIconButton onClick={() => handleEdit()} tooltip='Edit book' />
                        </Box>
                    }
                    {shop && <Box position="absolute" top={8} >
                        <DeleteIconButton onClick={() => handleOpenRemove(true)} tooltip='Remove book from shop' />
                    </Box>}
                </Box>
                <Box sx={{ background: '#ffc251', minHeight: '250px' }}>
                    <Box minWidth='100%' display='flex' justifyContent='flex-end'>
                        <LevelBox data={bookPrice} price={true} backgroundColor='red' color='white' />
                    </Box>
                    <CardContent>
                        <Typography sx={{ maxHeight: '65px', minHeight: '65px', overflowY: 'auto' }} textAlign='center' gutterBottom variant="h5" component="div">
                            {bookTitle}
                        </Typography>
                        <StyledTypography
                            mt={1}
                            variant="body2"
                            mb={1}
                            color="text.secondary"
                            textAlign='center'
                        >
                            {bookDescription}
                        </StyledTypography>
                        <Typography mt={1} variant="body2" color="text.secondary">
                            <LevelBox data={`${bookAuthor.firstName} ${bookAuthor.lastName}`} backgroundColor='#1bbf1b' color='white' />
                        </Typography>
                        <Typography mt={1} variant="body2" color="text.secondary">
                            <LevelBox data={bookCategory.name} backgroundColor='green' color='white' />
                        </Typography>

                    </CardContent>

                    {!noCardAction && !shop && userType !== 'ADMIN' && <CardActions>
                        <Button onClick={handleAddProductToShoppingCart} fullWidth variant='contained' size="small">
                            {smBreakpoint ? 'Add' : (
                                <>
                                    Add to cart
                                    <AddShoppingCartIcon sx={{ ml: 1 }} />
                                </>
                            )}
                        </Button>
                        {userType === 'VIP' && <Tooltip title="Download PDF"> <Button onClick={downloadPdf} variant='contained' size="small">PDF</Button></Tooltip>}
                    </CardActions>}
                </Box>
            </Card>
            {openBuyModal &&
                <BuyBookModal
                    openBuyModal={openBuyModal}
                    setOpenBuyModal={setOpenBuyModal}
                    bookImage={bookImage}
                    bookAuthor={bookAuthor}
                    bookCategory={bookCategory}
                    bookDescription={bookDescription}
                    bookTitle={bookTitle}
                    bookPrice={bookPrice}
                />
            }
            {openEditModal && <EditBookModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} bookId={bookId} />}
            {openDeleteModal && <DeleteBookModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} bookId={bookId} />}
            {openRemoveModal && <RemoveFromShopList userEmail={userEmail} openRemoveModal={openRemoveModal} setOpenRemoveModal={setOpenRemoveModal} bookId={bookId} />}
            <SuccessSnackBar open={openSuccess} alertMessage={successMessage} close={onCloseSuccess} />
            <ErrorSnackBar open={openError} alertMessage={error} close={onCloseError} />
        </>
    );
};

export default BookCard;
