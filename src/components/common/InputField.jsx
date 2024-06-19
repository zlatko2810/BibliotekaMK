import React from 'react';

import { Box, FormControl, InputLabel, OutlinedInput, Tooltip } from '@mui/material';

const InputField = ({ label, formik, name, disable, type, inputColor, multiline, rows, errorMessage, maxLength }) => {

    const handleInputChange = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (numericValue.length <= maxLength) {
            formik.setFieldValue(name, numericValue); // Set formik value with numeric input only
        }
    };

    return (
        <Tooltip title={disable && 'This input is disabled'} placement='bottom' >
            <FormControl
                sx={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    height: 'auto',
                    color: inputColor,
                }}
            >
                <InputLabel
                    htmlFor={name}
                    sx={{ color: inputColor }}
                >
                    {label}
                </InputLabel>
                <OutlinedInput
                    id={name}
                    defaultValue={formik.values[name] || ""}
                    label={label}
                    name={name}
                    type={type}
                    multiline={multiline}
                    rows={rows}
                    disabled={disable}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    onChange={maxLength ? handleInputChange : formik.handleChange}
                    value={formik.values[name] || ""}
                    inputProps={{
                        autoComplete: "off",
                        maxLength: maxLength && maxLength,
                        pattern: maxLength && "[0-9]*",
                    }}
                    sx={{
                        fontSize: "14px",
                        color: inputColor,
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: `2px solid ${inputColor}`,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: inputColor,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: inputColor,
                        },
                        '& .MuiInputBase-input': {
                            color: inputColor,
                        },
                        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                            borderColor: inputColor,
                        },
                        '&.Mui-disabled .MuiInputBase-input': {
                            color: inputColor,
                        },
                        "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: inputColor,
                            opacity: 0.5
                        },
                    }}
                />
                {errorMessage && formik.touched[name] && formik.errors[name] ? (
                    <Box sx={{ textAlign: 'center', color: 'red' }}>{formik.errors[name]}</Box>
                ) : null}
            </FormControl>
        </Tooltip>
    );
};

export default InputField;
