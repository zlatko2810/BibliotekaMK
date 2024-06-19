import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik'
import * as Yup from 'yup';

import SelectField from '../common/SelectField'

const AddPdf = ({ products }) => {

    const theme = useTheme()
    const mdBreakpoint = useMediaQuery(theme.breakpoints.up('md'))
    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);
    const navigate = useNavigate()

    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile && formik.values.productId) {
            const formData = new FormData();
            formData.append('productId', formik.values.productId);
            formData.append('document', selectedFile);

            try {
                const response = await axios.post('https://bibliotekamk-4931b6242b27.herokuapp.com/api/document/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${tokenFromRedux}`
                    }
                });

                if (response.status === 200) {
                    setMessage('Document uploaded successfully');
                    setTimeout(() => {
                        navigate('/home')
                    }, 2500);
                }
            } catch (error) {
                console.log('Error:', error);
                setMessage('Someting went wrong')
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            productId: ''
        },
        validationSchema: Yup.object({
            categoryName: Yup.string().required('Category is required'),
        }),
        onSubmit: (values) => {

        }
    })

    const differentValue = (option) => {
        const formatedOptions = option?.map(value => {
            const arrFormat = Object.values(value)
            return { value: arrFormat[0], name: arrFormat[1] }
        })
        return formatedOptions
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '24px',
                width: mdBreakpoint ? '300px' : '240px',
                margin: '0 auto',
                mt: 4,
                background: '#00000099', padding: '10px 35px', color: 'white'
            }}
        >
            <Typography variant="h6">Upload PDF</Typography>
            <TextField
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                sx={{ display: 'none' }}
                id="pdf-upload"
            />
            <label htmlFor="pdf-upload">
                <Button variant="contained" component="span">
                    Select PDF
                </Button>
            </label>
            {selectedFile && (
                <Typography variant="body2">{selectedFile.name}</Typography>
            )}
            <SelectField inputColor='white' options={differentValue(products)} name='productId' formik={formik} label='Book' />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!selectedFile || !formik.values.productId}
            >
                Upload
            </Button>
            {message && <Typography color={message === 'Someting went wrong' ? 'red' : 'green'} variant="body2" fontWeight='bold'>{message}</Typography>}
        </Box>
    );
};

export default AddPdf