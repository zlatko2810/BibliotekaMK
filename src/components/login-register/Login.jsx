import React, { useContext, useState } from 'react'
import '../../index.css'

import InputField from '../common/InputField'
import PasswordInput from '../common/PasswordInput'
import SuccessButton from '../common/SuccessButton'
import ErrorSnackBar from '../common/ErrorSnackBar'
import SuccessSnackBar from '../common/SuccessSnackBar'

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import { loginUser, registerUser } from '../../ApiUtils/Auth'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../Redux/modules/accessToken/actions";
import { UserInfoContext } from '../../contexts/UserInfoContext'

import { jwtDecode } from 'jwt-decode';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {

    const theme = useTheme()
    const mdBreakpoint = useMediaQuery(theme.breakpoints.down('md'))

    const [register, setRegister] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userInfoContext = useContext(UserInfoContext);

    const validationSchemaLogin = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    })

    const validationSchemaRegister = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phoneNumber: Yup.string().required('Phome Number is required'),
        address: Yup.string().required('Address is required'),
        password: Yup.string().required('Password is required')
    })

    const formik = useFormik({
        initialValues: !register
            ? { email: '', password: '' }
            : { firstName: '', lastName: '', email: '', password: '', phoneNumber: '', address: '', userRole: 'USER' },
        validationSchema: !register ? validationSchemaLogin : validationSchemaRegister,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (register) {
                setOpenSuccess(true)
                registerUser({ firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password, userRole: values.userRole, phoneNumber: values.phoneNumber, address: values.address })
                    .then((res) => {
                        if (res.status === 200) {
                            setOpenSuccess(true)
                            setSuccessMessage('Your user is created successfully')
                            dispatch(setAccessToken(res.data.jwtToken));
                            localStorage.setItem('token', res.data.jwtToken);
                            const decodedToken = jwtDecode(res.data.jwtToken);
                            userInfoContext.setUserInfo(decodedToken)
                            setTimeout(() => {
                                navigate('/home')
                            }, 3000);
                        }
                    })
                    .catch((e) => {
                        setError("Invalid Credentials")
                        setOpenError(true)
                        setTimeout(() => {
                            setOpenError(false)
                        }, 5000);
                    });
            }
            else {
                loginUser({
                    email: values.email, password: values.password
                })
                    .then((res) => {
                        if (res.status === 200) {
                            setOpenSuccess(true)
                            setSuccessMessage('You are login successfully')
                            dispatch(setAccessToken(res.data.jwtToken));
                            localStorage.setItem('token', res.data.jwtToken);
                            const decodedToken = jwtDecode(res.data.jwtToken);
                            userInfoContext.setUserInfo(decodedToken)
                            setTimeout(() => {
                                navigate('/home')
                            }, 3000);
                        }
                    })
                    .catch((e) => {
                        setError("Invalid Credentials")
                        setOpenError(true)
                        setTimeout(() => {
                            setOpenError(false)
                        }, 5000);
                    });
            }
        }
    })

    const handleRegister = () => {
        setRegister(true)
    }

    const handleLogin = () => {
        setRegister(false)
    }

    const onCloseSuccess = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenSuccess(false);
    };

    const onCloseError = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenError(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            formik.handleSubmit();
        }
    };

    return (
        <Box className='loginBg' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '300px', background: '#00000099', padding: mdBreakpoint ? '10px 35px' : '20px 35px', borderRadius: '24px' }} onKeyDown={handleKeyPress}>
                <Typography textAlign='center' fontWeight='bold' color='white' variant={mdBreakpoint ? 'h4' : 'h3'} sx={{ mb: mdBreakpoint ? 1 : 2 }}>{!register ? 'Login' : 'Register'}</Typography>
                {!register ?
                    <Stack spacing={2} sx={{ flexDirection: !mdBreakpoint && 'column', }}>
                        <InputField label='Email' formik={formik} name='email' inputColor='white' />
                        <PasswordInput label='Password' formik={formik} name='password' inputColor='white' />
                        <SuccessButton successButtonName='Login' bgcolor='#0866ff' handleSuccessClick={formik.handleSubmit} />
                    </Stack> :
                    <Stack spacing={mdBreakpoint ? 1 : 2}>
                        <InputField label='First Name' formik={formik} name='firstName' inputColor='white' errorMessage={false} />
                        <InputField label='Last Name' formik={formik} name='lastName' inputColor='white' errorMessage={false} />
                        <InputField label='Email' formik={formik} name='email' inputColor='white' errorMessage={false} />
                        <InputField label='Phone Number' formik={formik} name='phoneNumber' inputColor='white' type='number' errorMessage={false} />
                        <InputField label='Address' formik={formik} name='address' inputColor='white' errorMessage={false} />
                        <PasswordInput label='Password' formik={formik} name='password' inputColor='white' errorMessage={false} />
                        <SuccessButton successButtonName='Submit' bgcolor='#0866ff' handleSuccessClick={formik.handleSubmit} />
                    </Stack>
                }
                {!register &&
                    <>
                        <Typography textAlign='center' color='white' fontWeight='bold' mt={2}>If you don't have account click here</Typography>
                        <Stack spacing={2} alignItems='center'>
                            <ArrowCircleDownIcon sx={{ fontSize: '2.5rem', fill: 'white' }} />
                        </Stack>
                    </>
                }
                <Box mt={2}>
                    <SuccessButton handleSuccessClick={!register ? handleRegister : handleLogin} successButtonName={!register ? 'Register' : 'Back to login'} bgcolor='#9BCC63' width='100%' />
                </Box>
            </Box>
            <SuccessSnackBar open={openSuccess} alertMessage={successMessage} close={onCloseSuccess} />
            <ErrorSnackBar open={openError} alertMessage={error} close={onCloseError} />
        </Box >
    )
}

export default Login