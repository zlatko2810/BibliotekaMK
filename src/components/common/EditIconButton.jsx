import React from 'react'

import { IconButton, Tooltip } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const EditIconButton = ({ tooltip, onClick, color }) => {
    return (
        <Tooltip placement='top' title={tooltip}>
            <IconButton
                onClick={onClick}
            >
                <ModeEditOutlineIcon sx={{ fill: color ? color : 'white' }} />
            </IconButton>
        </Tooltip>
    )
}

export default EditIconButton