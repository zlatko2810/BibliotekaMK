import React, { useContext, useState } from 'react'
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import InputField from '../common/InputField'
import SuccessButton from '../common/SuccessButton'
import SuccessSnackBar from '../common/SuccessSnackBar'

import * as Yup from 'yup'
import { useFormik } from 'formik'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import axios from 'axios';
import { useSelector } from 'react-redux'
import { UserInfoContext } from '../../contexts/UserInfoContext'


const Subscribe = () => {

    const theme = useTheme()
    const mdBreakpoint = useMediaQuery(theme.breakpoints.down('md'))

    const { userInfo } = useContext(UserInfoContext);
    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validationSchema = Yup.object({
        cardNumber: Yup.string().required('Card number is required'),
        cardName: Yup.string().required('Card name is required'),
        cw: Yup.string().required('CW is required'),
        expirationDate: Yup.string().required('Expiration Date is required'),
    })

    const formik = useFormik({
        initialValues: {
            price: '2000 Ден',
            cardNumber: '',
            cardName: '',
            cw: '',
            expirationDate: ''
        }, validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            subscribe()
        }
    })

    const subscribe = async () => {
        try {
            const response = await axios.post(
                'https://bibliotekamk-4931b6242b27.herokuapp.com/api/users/subscribe',
                null,
                {
                    params: { email: userInfo.email },
                    headers: { 'Authorization': `Bearer ${tokenFromRedux}` }
                }
            );
            if (response.status === 200) {
                setSuccessMessage(response.data);
                setOpenSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        } catch (error) {
            console.log('Error subscibing', error);
        }
    };

    const onCloseSuccess = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenSuccess(false);
    };

    const dateValue = formik.values.expirationDate ? dayjs(formik.values.expirationDate) : null;

    return (
        <>
            {
                userInfo?.role === 'VIP' ?
                    <Box sx={{mt: 5, background: '#00000099', padding: { xs: '5px 35px', md: '30px 45px' }, borderRadius: '24px' }}>
                        <Typography color='white' textAlign='center' variant='h3'>{`You are already subscribed from ${userInfo?.dateOfSubscription}`}</Typography>
                    </Box>
                    :
                    <>
                        <Typography color='white' mt={mdBreakpoint ? 1 : 5} textAlign='center' variant='h3'>Subscribe</Typography>
                        <Box sx={{ width: '50%', margin: '50px auto', background: '#00000099', padding: { xs: '5px 35px', md: '30px 45px' }, borderRadius: '24px' }}>
                            <Stack spacing={2}>
                                <InputField inputColor='white' label='Total Price' formik={formik} name='price' disable={true} />
                                <InputField maxLength={16} inputColor='white' label='Card Number' type='number' formik={formik} name='cardNumber' />
                                <InputField inputColor='white' label='Card Name' formik={formik} name='cardName' />
                                <Stack spacing={2} direction='row'>
                                    <Box sx={{ width: '50%' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label={'Expiration Date'}
                                                views={['month', 'year']}
                                                name='expirationDate'
                                                value={dateValue}
                                                minDate={dayjs(new Date())}
                                                onChange={(value) => formik.setFieldValue('expirationDate', value ? new Date(value.$d) : null)}
                                                slotProps={{
                                                    textField: () => ({
                                                        color: formik.touched.expirationDate && Boolean(formik.errors.expirationDate) && 'error',
                                                        focused: formik.touched.expirationDate && Boolean(formik.errors.expirationDate) && true,
                                                    }),
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        '& input::placeholder': {
                                                            color: 'white !important',
                                                            opacity: 1,
                                                        },
                                                    },
                                                }}
                                                sx={{
                                                    fontSize: '14px',
                                                    color: 'white',
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        border: `2px solid ${'white'}`,
                                                    },
                                                    '& .MuiFormLabel-root': {
                                                        color: 'white !important'
                                                    },
                                                    "& .MuiButtonBase-root": {
                                                        color: 'white !important'
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        color: 'white !important'
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                    <Box sx={{ width: '50%' }}>
                                        <InputField inputColor='white' maxLength={3} label='CVC' type='number' formik={formik} name='cw' />
                                    </Box>
                                </Stack>
                                <Stack direction='row' justifyContent='center'>
                                    <SuccessButton handleSuccessClick={formik.handleSubmit} width='45%' successButtonName='Submit' bgcolor='green' />
                                </Stack>
                            </Stack>
                        </Box>
                        <SuccessSnackBar open={openSuccess} alertMessage={successMessage} close={onCloseSuccess} />
                    </>
            }
        </>
    )
}

export default Subscribe