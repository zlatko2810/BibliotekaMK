import React, { useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

const PasswordInput = ({ formik, label, name, inputColor, errorMessage }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <FormControl
            variant="outlined"
            sx={{
                width: '100%',
                marginBottom: '25px',
                backgroundColor: 'transparent',
            }}>
            <InputLabel htmlFor={label} sx={{ color: inputColor }}>{label}</InputLabel>
            <OutlinedInput
                label={label}
                type={showPassword ? 'text' : 'password'}
                name={name}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                defaultValue={formik.values[name] ? formik.values[name] : ""}
                onChange={formik.handleChange}
                inputProps={{
                    autoComplete: "off"
                }}
                sx={{
                    fontSize: "14px",
                    color: inputColor,
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid white'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: inputColor
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: inputColor
                    },
                    '& .MuiInputBase-input': {
                        color: inputColor
                    },
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large">
                            {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {errorMessage && formik.touched[name] && formik.errors[name] ? (
                <Box sx={{ textAlign: 'center', color: 'red' }}>{formik.errors[name]}</Box>
            ) : null}
        </FormControl>
    )
}

export default PasswordInput