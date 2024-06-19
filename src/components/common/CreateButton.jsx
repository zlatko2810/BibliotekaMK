import React from 'react'

import { Button } from '@mui/material'

const CreateButton = ({ handleCreate, text, marginRight, width }) => {

    return (
        <Button
            onClick={handleCreate}
            sx={{
                width: width ? width : '150px',
                borderRadius: "16px",
                maxHeight: "40px",
                marginRight: marginRight ? marginRight : "12px",
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
            {text ? text : 'Create'}
        </Button>
    )
}

export default CreateButton