import React, { useState } from 'react'

import { Alert, Box, Typography } from '@mui/material'

import PopupModal from '../common/PopupModal'
import SuccessButton from '../common/SuccessButton'
import CancelButton from '../common/CancelButton'
import ErrorSnackBar from '../common/ErrorSnackBar'

import { deleteProduct } from '../../ApiUtils/Product'
import { useDispatch, useSelector } from 'react-redux'
import { onBookChange } from '../../Redux/modules/books/actions'

const DeleteBookModal = ({ openDeleteModal, setOpenDeleteModal, bookId }) => {

    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);
    const dispatch = useDispatch();
    
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id, tokenFromRedux);
            setSuccessMessage('You successfully deleted Book');
            setOpenSuccess(true);
            setTimeout(() => {
                dispatch(onBookChange())
                setOpenDeleteModal(false)
            }, 2500);
        } catch (error) {
            setOpenError(true)
            setError('Failed to delete book')
        }
    };

    const onCloseError = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenError(false);
    };

    return (
        <>
            <PopupModal openModal={openDeleteModal} modalTitle='Delete Book' handleClose={() => setOpenDeleteModal(false)} >
                <Typography textAlign='center' fontWeight='bold' variant='h6'>{`Are you sure that you want to delete the book with id ${bookId}?`}</Typography>
                {!openSuccess ? <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <SuccessButton successButtonName='Yes' bgcolor='green' width='150px' handleSuccessClick={() => handleDelete(bookId)} />
                    <CancelButton handleCancle={() => setOpenDeleteModal(false)} />
                </Box> : <Alert severity="success" variant='filled'>{successMessage}</Alert>}
            </PopupModal>
            <ErrorSnackBar open={openError} alertMessage={error} close={onCloseError} />
        </>
    )
}

export default DeleteBookModal