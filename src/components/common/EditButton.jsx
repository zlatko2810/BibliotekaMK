import React from 'react'

import { Button } from '@mui/material'

const EditButton = ({ handleEdit }) => {
    
    return (
        <Button
            onClick={handleEdit}
            sx={{
                width: '150px',
                borderRadius: "16px",
                maxHeight: "40px",
                marginRight: "12px",
                padding: "5px 20px",
                fontSize: "14px",
                color: 'white',
                textTransform: "initial",
                background: '#0866ff',
                "&:hover": {
                    background: '#0866ff',
                },
            }}
            id={'success-button'}
            cy-automation-id={'success-button'}
            aria-describedby={'success-button'}
        >
            Edit
        </Button>
    )
}

export default EditButton