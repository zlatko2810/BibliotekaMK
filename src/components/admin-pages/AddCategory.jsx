import React, { useEffect, useState } from 'react'

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import InputField from '../common/InputField'
import CreateButton from '../common/CreateButton'
import EditIconButton from '../common/EditIconButton';
import DeleteIconButton from '../common/DeleteIconButton';
import SuccessSnackBar from '../common/SuccessSnackBar'
import ErrorSnackBar from '../common/ErrorSnackBar'
import EditButton from '../common/EditButton'
import CancelButton from '../common/CancelButton'

import { useFormik } from 'formik'
import * as Yup from 'yup';

import { createCategory, deleteCategory, editCategory, fetchCategories, fetchCategoryById } from '../../ApiUtils/Category'
import { useSelector } from 'react-redux'

const AddCategory = () => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.up('sm'))
    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);

    const [category, setCategory] = useState([])
    const [categoryForEdit, setCategoryForEdit] = useState(null)
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const formik = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: Yup.object({
            categoryName: Yup.string().required('Category is required'),
        }),
        onSubmit: async (values) => {
            if (!editMode) {
                try {
                    const category = {
                        name: values.categoryName,
                        parent: values.parentCategory ? values.parentCategory : null
                    };
                    await createCategory(category, tokenFromRedux);
                    setOpenSuccess(true)
                    loadCategories();
                    setSuccessMessage('Category successfully created');
                    formik.resetForm();
                } catch (error) {
                    console.log('Failed to create category', error);
                }
            } else {
                try {
                    const category = {
                        name: values.categoryName,
                        parent: values.parentCategory ? values.parentCategory : null
                    };
                    await editCategory(categoryForEdit.id, category, tokenFromRedux);
                    setSuccessMessage('You successfully updated category');
                    setOpenSuccess(true);
                    loadCategories();
                    formik.resetForm();
                    setEditMode(false);
                    setCategoryForEdit(null);
                } catch (error) {
                    setOpenError(true)
                    setError('Failed to update category')
                }
            }
        }
    });

    const loadCategories = async () => {
        try {
            const response = await fetchCategories(tokenFromRedux);
            setCategory(response.data);
        } catch (error) {
            setOpenError(true)
            setError('Failed to get authors')
        }
    };

    useEffect(() => {
        if (tokenFromRedux) {
            loadCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromRedux]);

    const handleEdit = async (category) => {
        setEditMode(true);
        try {
            const response = await fetchCategoryById(category.id, tokenFromRedux);
            const categoryForEdit = response.data;
            formik.setValues({
                categoryName: categoryForEdit.name,
            });
            setCategoryForEdit(categoryForEdit);
        } catch (error) {
            console.log('Failed to fetch author by ID', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id, tokenFromRedux);
            setSuccessMessage('You successfully deleted category');
            setOpenSuccess(true);
            loadCategories();
        } catch (error) {
            console.log('Failed to delete category', error);
            setOpenError(true)
            setError('Failed to delete category')
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
        <Box sx={{ paddingY: '3%', paddingX: '7%' }}>
            <Box sx={{ background: '#00000099', padding: '10px 35px', borderRadius: '24px' }}>
                <Box sx={{ width: '100%', textAlign: 'center', mb: 3 }}>
                    <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant={!smBreakpoint ? 'h5' : 'h4'}>{editMode ? 'Edit Category' : 'Create Category'}</Typography>
                </Box>
                <Stack spacing={2} direction={smBreakpoint ? 'row' : 'column'} margin='0 auto' alignItems='center' sx={{ width: { xs: 'auto', md: '50%' } }}>
                    <InputField label='Category' formik={formik} name='categoryName' inputColor='white' />
                    {editMode ? <EditButton handleEdit={formik.handleSubmit} /> : <CreateButton handleCreate={formik.handleSubmit} />}
                    {editMode && <CancelButton handleCancle={() => handleCancel()} />}
                </Stack>

                <Box sx={{
                    background: '#e1bebe',
                    width: { xs: 'auto', md: '35%' },
                    margin: { xs: '50px auto', md: '30px auto' },
                    borderRadius: 4,
                    p: 1
                }}>
                    <Typography textAlign='center' variant='h6'>Category</Typography>
                    <Box sx={{ maxHeight: { xs: '170px', md: '200', lg: '280px' }, overflowY: 'auto' }}>
                        {category.map(category =>
                            <Box sx={{ display: 'flex', borderBottom: '1px solid black' }}>
                                <Box display='flex' justifyContent='space-around' alignItems='center' sx={{ width: '100%', }}>
                                    <Typography>{category.name}</Typography>
                                </Box>
                                <Box display='flex' mr={6}>
                                    <EditIconButton color='black' onClick={() => handleEdit(category)} tooltip='Edit author' />
                                    <DeleteIconButton color='black' onClick={() => handleDelete(category.id)} tooltip='Delete author' />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <SuccessSnackBar open={openSuccess} alertMessage={successMessage} close={onCloseSuccess} />
            <ErrorSnackBar open={openError} alertMessage={error} close={onCloseError} />
        </Box >
    )
}

export default AddCategory