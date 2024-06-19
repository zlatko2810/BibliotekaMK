import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'

export const MainSearch = ({ xsBreakpoint, setSearchTerm, searchTerm }) => {

    return (
        <>
            <Input
                disableUnderline
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                    width: { xs: xsBreakpoint ? '90px' : '120px', md: '200px', lg: '280px' },
                    backgroundColor: '#f3f3f4',
                    borderRadius: 4,
                    px: 2,
                    opacity: '80%',
                    transition: 'opacity 0.3s ease',
                    '&:hover': {
                        opacity: '100%',
                    },
                }}
                endAdornment={
                    !xsBreakpoint &&
                    <InputAdornment position="end">
                        <SearchIcon color="disabled" />
                    </InputAdornment>
                }
            />
        </>
    )
}
