import React from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';

const SelectField = ({ label, name, formik, options, disable, inputColor }) => {

    const { values, handleChange, handleBlur, touched, errors } = formik;

    return (
        <Box width="100%">
            <Tooltip title={disable && 'This input is disabled'} placement='bottom' >
                <FormControl sx={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    color: inputColor,
                }}>
                    <InputLabel sx={{ color: inputColor }}>{label}</InputLabel>
                    <Select
                        name={name}
                        label={label}
                        value={values[name] ? values[name] : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disable}
                        error={touched[name] && Boolean(errors[name])}
                        sx={{
                            fontSize: "14px",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: `${inputColor} !important`,
                                borderRadius: "4px",
                                border: `2px solid ${inputColor}`,
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: inputColor,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: inputColor,
                                border: `2px solid ${inputColor}`,
                            },
                            ".MuiSelect-icon": {
                                fill: inputColor,
                            },
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: `${inputColor} !important`,
                                opacity: 0.5
                            },
                            "& .MuiSelect-select": {
                                color: `${inputColor} !important`,
                            }
                        }}
                        MenuProps={{
                            PaperProps: {
                                elevation: 0,
                                sx: {
                                    maxHeight: "250px",
                                    fontSize: "14px",
                                    border: "1px solid",
                                },
                            },
                        }}
                    >
                        {options?.map((option) => {
                            return <MenuItem
                                title={option.name}
                                key={option.value}
                                value={option.value}
                                id={`${option.name}-option`}
                                cy-automation-id={`${option.name}-option`}
                                aria-describedby={`${option.name}-option`}
                            >
                                {option.name}
                            </MenuItem>;
                        })}
                    </Select>
                    {
                        formik.touched[name] && formik.errors[name] ? (
                            <Box sx={{ textAlign: 'center', color: 'red' }}>{formik.errors[name]}</Box>
                        ) : null
                    }
                </FormControl>
            </Tooltip>
        </Box>
    )
}

export default SelectField