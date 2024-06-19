import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const ErrorSnackBar = ({ alertMessage, open, close }) => {
    return (
        <Snackbar open={open} onClose={close} autoHideDuration={3000}>
            <Alert onClose={close} variant="filled" sx={{ width: '100%' }} severity='error'>
                {alertMessage}
            </Alert>
        </Snackbar>
    )
}

export default ErrorSnackBar