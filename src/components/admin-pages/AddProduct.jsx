import React, { useEffect, useState } from 'react'

import { Box, Card, CardContent, CardMedia, IconButton, Stack, Typography, } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from "@mui/icons-material/Close";

import PopupModal from '../common/PopupModal';
import SelectField from '../common/SelectField';
import CreateButton from '../common/CreateButton';
import InputField from '../common/InputField';
import SuccessSnackBar from '../common/SuccessSnackBar';
import ErrorSnackBar from '../common/ErrorSnackBar';

import { fetchAuthors } from '../../ApiUtils/Author';
import { fetchCategories } from '../../ApiUtils/Category';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onBookChange } from '../../Redux/modules/books/actions';

const AddProduct = () => {

    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false)
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
        formik.handleReset()
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            image: '',
            categoryId: '',
            authorId: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Book name is required'),
            description: Yup.string().required('Description is required'),
            authorId: Yup.string().required('Author is required'),
            categoryId: Yup.string().required('Category is required'),
            price: Yup.string().required('Price is required'),
            image: Yup.mixed().required('Image is required').test(
                'fileSize',
                'File too large',
                value => value && value.size <= 1024 * 1024
            )
        }),
        onSubmit: async (values) => {
            try {
                await addProduct(values);
            } catch (error) {
                console.log("Error", error);
            }
        }
    });

    const addProduct = async (product) => {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.categoryId);
        formData.append('author', product.authorId);
        formData.append('image', image);
        const url = `https://bibliotekamk-4931b6242b27.herokuapp.com/api/products/add`;
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${tokenFromRedux}`,
                },
            });
            if (response.status === 201) {
                setOpenSuccess(true)
                setSuccessMessage('You successfully created book, now you should upload PDF')
                setTimeout(() => {
                    dispatch(onBookChange())
                    navigate('/home/add-pdf')
                }, 3500);
            }
            return response.data;
        } catch (error) {
            console.log('Error adding product:', error);
            setError(error)
        }
    };

    const loadAuthors = async () => {
        try {
            const response = await fetchAuthors(tokenFromRedux);
            setAuthors(response.data);
        } catch (error) {
            setOpenError(true)
            setError('Failed to get authors')
        }
    };

    const loadCategories = async () => {
        try {
            const response = await fetchCategories(tokenFromRedux);
            setCategories(response.data);
        } catch (error) {
            setOpenError(true)
            setError('Failed to get products')
        }
    };

    useEffect(() => {
        if (openModal) {
            loadAuthors();
            loadCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromRedux, openModal]);

    const differentValue = (option) => {
        const formatedOptions = option?.map(value => {
            const arrFormat = Object.values(value)
            return { value: arrFormat[0], name: arrFormat[1] }
        })
        return formatedOptions
    }

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('image', file);
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnail(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleClearImage = () => {
        formik.setFieldValue('image', null);
        setImage(null);
        setThumbnail(null);
    };

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
            <Box sx={{ width: '100%', textAlign: 'center', mb: 3, background: '#00000099', paddingY: '20px ', borderRadius: '24px' }}>
                <Typography sx={{ color: "white", fontWeight: "bold" }} variant='h4'>Create Book</Typography>
                <IconButton sx={{ mt: 1 }} onClick={() => setOpenModal(true)}>
                    <AddCircleIcon sx={{ fontSize: '3rem', fill: "white" }} />
                </IconButton>
            </Box>

            {openModal && <PopupModal openModal={openModal} modalTitle='Create Book' handleClose={handleCloseModal} >
                <Stack spacing={2}>
                    <Card>
                        <CardContent>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="image">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AddCircleIcon />
                                </IconButton>
                            </label>
                            {thumbnail && (
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <CardMedia
                                        component="img"
                                        image={thumbnail}
                                        alt="Uploaded Image"
                                        sx={{ width: 200, height: 200, objectFit: 'cover' }}
                                    />
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClearImage}
                                        size="small"
                                        sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </CardContent>
                        {formik.touched.image && formik.errors.image && (
                            <Box sx={{ textAlign: 'center', color: 'red' }}>{formik.errors.image}</Box>
                        )}
                    </Card>

                    <InputField formik={formik} name='name' label='Book name' />
                    <SelectField options={differentValue(authors)} name='authorId' formik={formik} label='Select Author' />
                    <SelectField options={differentValue(categories)} name='categoryId' formik={formik} label='Select Category' />
                    <InputField formik={formik} name='price' label='Price' type='number' />
                    <InputField formik={formik} name='description' label='Description' />
                    <Box textAlign='center'>
                        <CreateButton handleCreate={formik.handleSubmit} />
                    </Box>
                </Stack>
            </PopupModal>}
            <SuccessSnackBar open={openSuccess} alertMessage={successMessage} close={onCloseSuccess} />
            <ErrorSnackBar open={openError} alertMessage={error} close={onCloseError} />
        </Box>
    )
}

export default AddProduct