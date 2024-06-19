import React from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectCategory = ({ options, value, handleChange }) => {

    const differentValueNone = (option) => {
        const formatedOptions = option?.map(value => {
            const arrFormat = Object.values(value)
            return { value: arrFormat[0], name: arrFormat[1] }
        })
        return [{ value: null, name: 'None' }, ...formatedOptions]
    }

    return (
        <FormControl sx={{ m: 1, minWidth: { xs: 120, md: 140, lg: 250 }, color: 'white' }} size="small">
            <InputLabel sx={{ color: 'white' }} id="category">Category</InputLabel>
            <Select
                labelId="category"
                id="cateory-small"
                value={value}
                label="Category"
                onChange={handleChange}
                sx={{
                    fontSize: "14px",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: `white !important`,
                        borderRadius: "4px",
                        border: `2px solid white`,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: 'white',
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: 'white',
                        border: `2px solid white`,
                    },
                    ".MuiSelect-icon": {
                        fill: 'white',
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: `white !important`,
                        opacity: 0.5
                    },
                    "& .MuiSelect-select": {
                        color: 'white !important', 
                    },
                }}
            >
                {differentValueNone(options)?.map((option) => {
                    return <MenuItem
                        title={option.name}
                        key={option.value}
                        value={option.name}
                        id={`${option.name}-option`}
                        cy-automation-id={`${option.name}-option`}
                        aria-describedby={`${option.name}-option`}
                    >
                        {option.name}
                    </MenuItem>;
                })}
            </Select>
        </FormControl >
    )
}

export default SelectCategory