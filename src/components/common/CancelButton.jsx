import React from 'react'

import { Button } from '@mui/material'

const CancelButton = ({ handleCancle, width }) => {

    return (
        <Button
            onClick={handleCancle}
            sx={{
                width: width ? width : '150px',
                borderRadius: "16px",
                maxHeight: "40px",
                marginRight: "12px",
                padding: "5px 20px",
                fontSize: "14px",
                color: 'white',
                textTransform: "initial",
                background: 'red',
                "&:hover": {
                    background: 'red',
                },
            }}
            id={'success-button'}
            cy-automation-id={'success-button'}
            aria-describedby={'success-button'}
        >
            Cancel
        </Button>
    )
}

export default CancelButton