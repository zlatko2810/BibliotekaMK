import React, { useState } from 'react'

import { Alert, Box, Stack } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';

import InputField from '../common/InputField'
import SuccessButton from '../common/SuccessButton';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BuyBookSecondStep = ({ setActiveStep, quantities, userEmail }) => {

    const navigate = useNavigate()
    const tokenFromRedux = useSelector((state) => state.accessToken.accessToken);

    const [successMessage, setSuccessMessage] = useState('')
    const [openSuccess, setOpenSuccess] = useState(false);

    const validationSchema = Yup.object({
        cardNumber: Yup.string().required('Card number is required'),
        cardName: Yup.string().required('Card name is required'),
        cw: Yup.string().required('CW is required'),
        expirationDate: Yup.string().required('eExpiration Date is required'),
    })

    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            cardName: '',
            cw: '',
            expirationDate: ''
        }, validationSchema: validationSchema,
        onSubmit: (values) => {
            createOrder(orderRequest)
        }
    })


    const createOrder = async (orderRequest) => {
        try {
            const response = await axios.post(
                'https://bibliotekamk-4931b6242b27.herokuapp.com/api/orders',
                orderRequest,
                {
                    headers: {
                        'Authorization': `Bearer ${tokenFromRedux}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                setSuccessMessage('Order successfully created. You will receive the book at your address');
                setOpenSuccess(true)
                setTimeout(() => {
                    navigate('/home')
                }, 3000);
            }
        } catch (error) {
            console.log('error', error)
        }
    };

    const orderRequest = {
        email: userEmail,
        orderDetails: {
            ...quantities
        }
    };

    const dateValue = formik.values.expirationDate ? dayjs(formik.values.expirationDate) : null;

    return (
        <Box>
            <Stack spacing={2}>
                <InputField label='Card Number' type='number' formik={formik} name='cardNumber' maxLength={16} />
                <InputField label='Card Name' formik={formik} name='cardName' />
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
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <InputField label='CVC' maxLength={3} type='number' formik={formik} name='cw' />
                    </Box>
                </Stack>
                {openSuccess ? <Alert variant="filled">{successMessage}</Alert> :
                    <Stack direction='row' justifyContent='space-between'>
                        <SuccessButton handleSuccessClick={formik.handleSubmit} width='45%' successButtonName='Submit' bgcolor='green' />
                        <SuccessButton width='45%' successButtonName='Back' bgcolor='red' handleSuccessClick={() => setActiveStep(1)} />
                    </Stack>}
            </Stack>
        </Box>
    )
}

export default BuyBookSecondStep