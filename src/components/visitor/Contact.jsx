import React, { useState } from 'react'

import { Box, Button, Typography, Grid } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputField from '../common/InputField';
import SuccessSnackBar from '../common/SuccessSnackBar';

const Contact = () => {

    const [openMessage, setOpenMessage] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            setMessage('Message sent successfully!');
            setOpenMessage(true)
            setTimeout(() => {
                resetForm();
                navigate('/')
            }, 3000);
        },
    });

    const onCloseSuccess = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenMessage(false);
    };

    return (
        <>
            <Box
                component="form"
                sx={{ mt: { xs: 2, md: 3, lg: 8 }, p: 3, borderRadius: 1, boxShadow: 3, maxWidth: '600px', mx: 'auto' }}
                onSubmit={formik.handleSubmit}
            >
                <Box sx={{ background: '#00000099', padding: '20px 35px', borderRadius: '24px' }} >
                    <Typography variant="h4" color='white' component="h1" textAlign="center" gutterBottom>
                        Contact Us
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputField label='Name' formik={formik} name='name' inputColor='white' />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField label='Email' formik={formik} name='email' inputColor='white' />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField label='Message' formik={formik} name='message' inputColor='white' multiline={true} rows={4} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <SuccessSnackBar open={openMessage} alertMessage={message} close={onCloseSuccess} />
        </>
    )
}

export default Contact