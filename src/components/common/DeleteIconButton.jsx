import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';

const DeleteIconButton = ({ tooltip, onClick, color }) => {
    return (
        <Tooltip placement='top' title={tooltip}>
            <IconButton
                onClick={onClick}
            >
                <DeleteIcon sx={{ fill: color ? color : 'white' }} />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteIconButton