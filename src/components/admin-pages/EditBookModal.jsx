import React, { useEffect, useState } from 'react';

import { Box, Card, CardContent, CardMedia, IconButton, Stack } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import PopupModal from '../common/PopupModal';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import SuccessSnackBar from '../common/SuccessSnackBar';
import ErrorSnackBar from '../common/ErrorSnackBar';
import EditButton from '../common/EditButton';

import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { getProductForEdit } from '../../ApiUtils/Product';
import { fetchAuthors } from '../../ApiUtils/Author';
import { fetchCategories } from '../../ApiUtils/Category';
import { onBookChange } from '../../Redux/modules/books/actions';

const EditBookModal = ({ openEditModal, setOpenEditModal, bookId }) => {

    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);

    const [image, setImage] = useState(null);
    const [productData, setProductData] = useState({});
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);
    const [localUploadImage, setLocalUploadImage] = useState(false);

    const dispatch = useDispatch();

    const loadProduct = async () => {
        try {
            const response = await getProductForEdit(bookId, tokenFromRedux);
            setProductData(response.data);
            if (response.data.image) {
                setThumbnail(response.data.image);
                setImage(convertBase64ToFile(response.data.image));
            }
        } catch (error) {
            setOpenError(true);
            setError('Failed to load product');
        }
    };

    useEffect(() => {
        if (openEditModal) {
            loadProduct();
            loadAuthors();
            loadCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromRedux, openEditModal]);

    const loadAuthors = async () => {
        try {
            const response = await fetchAuthors(tokenFromRedux);
            setAuthors(response.data);
        } catch (error) {
            setOpenError(true);
            setError('Failed to get authors');
        }
    };

    const loadCategories = async () => {
        try {
            const response = await fetchCategories(tokenFromRedux);
            setCategories(response.data);
        } catch (error) {
            setOpenError(true);
            setError('Failed to get categories');
        }
    };

    const formik = useFormik({
        initialValues: {
            name: productData?.name || '',
            description: productData?.description || '',
            price: productData?.price || '',
            image: '',
            categoryId: productData?.category?.id || '',
            authorId: productData?.author?.id || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Book name is required'),
            description: Yup.string().required('Description is required'),
            authorId: Yup.string().required('Author is required'),
            categoryId: Yup.string().required('Category is required'),
            price: Yup.string().required('Price is required'),
            image: Yup.string('Image is required')
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await editProduct(values);
            } catch (error) {
                console.log("Error", error);
            }
        }
    });

    const editProduct = async (product) => {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.categoryId);
        formData.append('author', product.authorId);
        formData.append('image', image);
        const url = `https://bibliotekamk-4931b6242b27.herokuapp.com/api/products/${bookId}`;
        try {
            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${tokenFromRedux}`,
                },
            });
            if (response.status === 201) {
                setOpenSuccess(true);
                setSuccessMessage('You successfully edited the book');
                setTimeout(() => {
                    dispatch(onBookChange());
                    setOpenEditModal(false);
                }, 2500);
            }
            return response.data;
        } catch (error) {
            setOpenError(true);
            setError(error.message || 'Failed to edit product');
        }
    };

    const convertBase64ToFile = (base64String) => {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'image/png' });
    };

    const differentValue = (option) => {
        const formattedOptions = option?.map(value => {
            const arrFormat = Object.values(value);
            return { value: arrFormat[0], name: arrFormat[1] };
        });
        return formattedOptions;
    };

    const handleFileChange = (event) => {
        setLocalUploadImage(true)
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
        <>
            <PopupModal openModal={openEditModal} modalTitle='Edit Book' handleClose={() => setOpenEditModal(false)}>
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
                                        image={localUploadImage ? thumbnail : `data:image/png;base64, ${thumbnail}`}
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
                        <EditButton handleEdit={formik.handleSubmit} />
                    </Box>
                </Stack>
            </PopupModal>
            <SuccessSnackBar open={openSuccess} alertMessage={successMessage} close={onCloseSuccess} />
            <ErrorSnackBar open={openError} alertMessage={error} close={onCloseError} />
        </>
    );
}

export default EditBookModal;
