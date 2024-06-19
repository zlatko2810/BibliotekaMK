import React from 'react';

import Box from '@mui/material/Box';

const LevelBox = ({ data, backgroundColor, color, width, price }) => {

    return (
        <Box
            width={width ? width : 'auto'}
            minWidth='40px'
            height='30px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            whiteSpace="normal"
            textAlign='center'
            sx={{
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: 1,
                backgroundColor: backgroundColor,
                borderRadius: '4px',
                color: color,
                paddingLeft: '10px',
                paddingRight: '10px'
            }}
        >
            {data} {price && 'МКД'}
        </Box>
    );

};

export default LevelBox;
