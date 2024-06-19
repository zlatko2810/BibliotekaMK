import React, { useState } from 'react'
import { Alert, Box, Typography } from '@mui/material'

import PopupModal from '../common/PopupModal'
import CancelButton from '../common/CancelButton'
import ErrorSnackBar from '../common/ErrorSnackBar'
import SuccessButton from '../common/SuccessButton'

import { removeProductFromShoppingCart } from '../../ApiUtils/Order'

import { useDispatch, useSelector } from 'react-redux'
import { onBookChange } from '../../Redux/modules/books/actions'

const RemoveFromShopList = ({ userEmail, openRemoveModal, setOpenRemoveModal, bookId }) => {

    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);
    const dispatch = useDispatch();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);


    const handleRemoveProductFromShoppingCart = async () => {
        try {
            const response = await removeProductFromShoppingCart(bookId, userEmail, tokenFromRedux);
            setSuccessMessage(response.data);
            setOpenSuccess(true)
            setTimeout(() => {
                dispatch(onBookChange())
                setOpenRemoveModal(false)
            }, 2500);
        } catch (error) {
            setError('Error adding product to shopping cart');
            console.log('Error:', error);
        }
    };

    const onCloseError = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenError(false);
    };

    return (
        <>
            <PopupModal openModal={openRemoveModal} modalTitle='Remove Book' handleClose={() => setOpenRemoveModal(false)} >
                <Typography textAlign='center' fontWeight='bold' variant='h6'>{`Are you sure that you want to remove this book from your shopping card ?`}</Typography>
                {!openSuccess ? <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <SuccessButton successButtonName='Yes' bgcolor='green' width='150px' handleSuccessClick={() => { handleRemoveProductFromShoppingCart() }} />
                    <CancelButton handleCancle={() => setOpenRemoveModal(false)} />
                </Box> : <Alert severity="success" variant='filled'>{successMessage}</Alert>}
            </PopupModal>
            <ErrorSnackBar open={openError} alertMessage={error} close={onCloseError} />
        </>
    )
}

export default RemoveFromShopList