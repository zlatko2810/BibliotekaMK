import React, { useContext } from 'react'
import { Avatar, Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import InputField from '../common/InputField'
import SelectField from '../common/SelectField'

import { useFormik } from 'formik'
import { UserInfoContext } from '../../contexts/UserInfoContext'

const userTypeOptions = [
    { name: 'ADMIN', value: 'ADMIN' },
    { name: 'USER', value: 'USER' },
    { name: 'VIP', value: 'VIP' },
]
const MyProfile = () => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.up('sm'))
    const mdBreakpoint = useMediaQuery(theme.breakpoints.up('md'))
    const { userInfo } = useContext(UserInfoContext);
    
    const formik = useFormik({
        initialValues: {
            firstName: userInfo?.firstName || '',
            lastName: userInfo?.lastName || '',
            email: userInfo?.email || '',
            address: userInfo?.address || '',
            userType: userInfo?.role || ''
        },
        enableReinitialize: true,
        onSubmit: async (values) => {

        }
    })

    return (
        <Box sx={{ width: !smBreakpoint ? '90%' : !mdBreakpoint ? '70%' : '40%', margin: { xs: '20px auto', md: '30px auto' } }}>
            <Box sx={{ textAlign: 'center', mb: 3, background: '#00000099', padding: mdBreakpoint ? '20px' : '10px', borderRadius: '24px' }}>
                <Stack spacing={!smBreakpoint ? 1 : 2}>
                    <Box sx={{ display: !mdBreakpoint && 'flex', justifyContent: 'space-between', alignItems: 'center', pb: !smBreakpoint && 1 }}>
                        <Typography textAlign='center' variant={!smBreakpoint ? 'h5' : !mdBreakpoint ? 'h5' : 'h4'} mb={mdBreakpoint && 1} color='white'>My profile</Typography>
                        <Box display='flex' justifyContent='center'> <Avatar sx={{ width: !mdBreakpoint ? '50px' : '50px', height: !mdBreakpoint ? '50px' : '50px', fontSize: !mdBreakpoint ? '1.7rem' : '2rem' }} alt={userInfo?.firstName} src="/static/images/avatar/2.jpg" /></Box>
                    </Box>
                    <InputField inputColor='white' disable={true} label='First Name' formik={formik} name='firstName' />
                    <InputField inputColor='white' disable={true} label='Last Name' formik={formik} name='lastName' />
                    <InputField inputColor='white' disable={true} label='Email' formik={formik} name='email' />
                    <InputField inputColor='white' disable={true} label='Address' formik={formik} name='address' />
                    <SelectField inputColor='white' disable={true} label='User Type' formik={formik} name='userType' options={userTypeOptions} />
                </Stack>
            </Box>
        </Box >
    )
}

export default MyProfile