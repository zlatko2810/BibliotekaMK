import React, { useEffect, useState } from 'react';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { createAuthor, deleteAuthor, editAuthor, fetchAuthorById, fetchAuthors } from '../../ApiUtils/Author';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputField from '../common/InputField';
import CreateButton from '../common/CreateButton';
import EditIconButton from '../common/EditIconButton';
import DeleteIconButton from '../common/DeleteIconButton';
import SuccessSnackBar from '../common/SuccessSnackBar';
import EditButton from '../common/EditButton';
import CancelButton from '../common/CancelButton';
import ErrorSnackBar from '../common/ErrorSnackBar';

import { useSelector } from 'react-redux';

const AddAuthor = () => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.up('sm'))

    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);
    const [authors, setAuthors] = useState([]);
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);

    const formik = useFormik({
        initialValues: {
            authorFirstName: '',
            authorLastName: ''
        },
        validationSchema: Yup.object({
            authorFirstName: Yup.string().required('First name is required'),
            authorLastName: Yup.string().required('Last name is required')
        }),
        onSubmit: async (values) => {
            if (!editMode) {
                try {
                    await createAuthor({ firstName: values.authorFirstName, lastName: values.authorLastName }, tokenFromRedux);
                    setSuccessMessage('You successfuly created author')
                    setOpenSuccess(true)
                    loadAuthors();
                    formik.resetForm();
                } catch (error) {
                    setOpenError(true)
                    setError('Failed to create author')
                }
            } else {
                try {
                    await editAuthor(editingAuthor.id, { firstName: values.authorFirstName, lastName: values.authorLastName }, tokenFromRedux);
                    setSuccessMessage('You successfully updated author');
                    setOpenSuccess(true);
                    loadAuthors();
                    formik.resetForm();
                    setEditMode(false);
                    setEditingAuthor(null);
                } catch (error) {
                    setOpenError(true)
                    setError('Failed to update author')
                }
            }
        }
    });

    const loadAuthors = async () => {
        try {
            const response = await fetchAuthors(tokenFromRedux);
            setAuthors(response.data);
        } catch (error) {
            setOpenError(true)
            setError('Failed to get authors')
        }
    };

    useEffect(() => {
        if (tokenFromRedux) {
            loadAuthors();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromRedux]);

    const handleEdit = async (author) => {
        setEditMode(true);
        try {
            const response = await fetchAuthorById(author.id, tokenFromRedux);
            const editedAuthor = response.data;
            formik.setValues({
                authorFirstName: editedAuthor.firstName,
                authorLastName: editedAuthor.lastName
            });
            setEditingAuthor(editedAuthor);
        } catch (error) {
            console.log('Failed to fetch author by ID', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAuthor(id, tokenFromRedux);
            setSuccessMessage('You successfully deleted author');
            setOpenSuccess(true);
            loadAuthors();
        } catch (error) {
            setOpenError(true)
            setError('Failed to delete author')
        }
    };

    const handleCancel = async () => {
        formik.resetForm();
        setEditMode(false)
    }

    const onCloseSuccess = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenSuccess(false);
    };

    const onCloseError = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenError(false);
    };


    return (
        <>
            <Box sx={{ paddingY: { xs: '1.5%', md: '3%' }, paddingX: '7%' }}>
                <Box sx={{ background: '#00000099', padding: { xs: '5px 35px', md: '20px 35px' }, borderRadius: '24px' }}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 3 } }}>
                        <Typography variant='h4' sx={{ color: 'white', fontWeight: 'bold', }}> {editMode ? 'Edit Author' : 'Create Author'}</Typography>
                    </Box>
                    <Stack spacing={smBreakpoint ? 2 : 1} direction={smBreakpoint ? 'row' : 'column'} margin='0 auto' alignItems='center' sx={{ width: { xs: 'auto', md: '50%' } }}>
                        <InputField label='First Name' formik={formik} name='authorFirstName' inputColor='white' />
                        <InputField label='Last Name' formik={formik} name='authorLastName' inputColor='white' />
                        {editMode ? <EditButton handleEdit={formik.handleSubmit} /> : <CreateButton handleCreate={formik.handleSubmit} />}
                        {editMode && <CancelButton handleCancle={() => handleCancel()} />}
                    </Stack>

                    <Box sx={{
                        background: '#e1bebe',
                        width: { xs: 'auto', md: '45%' },
                        margin: { xs: '10px auto', md: '30px auto' },
                        borderRadius: 4,
                        p: 1
                    }}>
                        <Typography textAlign='center' variant='h6'>Authors</Typography>
                        <Box sx={{ maxHeight: { xs: '170px', md: '280px' }, overflowY: 'auto' }}>
                            {authors?.map(author =>
                                <Box sx={{ display: 'flex', borderBottom: '1px solid black' }}>
                                    <Box display='flex' justifyContent='space-around' alignItems='center' sx={{ width: '100%', }}>
                                        <Typography>{author.firstName}</Typography>
                                        <Typography>{author.lastName}</Typography>
                                    </Box>
                                    {author.authorFirstName !== '' &&
                                        <Box display='flex'>
                                            <EditIconButton color='black' onClick={() => handleEdit(author)} tooltip='Edit author' />
                                            <DeleteIconButton color='black' onClick={() => handleDelete(author.id)} tooltip='Delete author' />
                                        </Box>}
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box >
            <SuccessSnackBar open={openSuccess} alertMessage={successMessage} close={onCloseSuccess} />
            <ErrorSnackBar open={openError} alertMessage={error} close={onCloseError} />
        </>
    );
}

export default AddAuthor