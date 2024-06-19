import React from 'react'

import { Button } from '@mui/material'

const SuccessButton = ({ handleSuccessClick, successButtonName, width, bgcolor }) => {

    return (
        <Button
            onClick={handleSuccessClick}
            sx={{
                width: width,
                borderRadius: "25px",
                maxHeight: "40px",
                padding: "5px 20px",
                fontSize: "14px",
                color: 'white',
                textTransform: "initial",
                background: bgcolor,
                "&:hover": {
                    background: bgcolor,
                },
            }}
            id={'success-button'}
            cy-automation-id={'success-button'}
            aria-describedby={'success-button'}
        >
            {successButtonName}
        </Button>
    )
}

export default SuccessButton