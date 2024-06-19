import React from 'react'

import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";

const PopupModal = ({ openModal, handleClose, modalTitle, children }) => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.up('sm'))

    return (
        <Dialog
            open={openModal}
            onClose={handleClose}
            sx={{
                boxShadow: "3px 3px 6px #00000066",
                opacity: "1",
                border: "none",
                "& .MuiDialog-paper	": {
                    borderRadius: "4px",
                },
            }}
        >
            <Box
                sx={{
                    width: smBreakpoint ? "500px" : "270px",
                }}
            >
                <DialogTitle>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                            }}
                            variant="h2"
                        >
                            {modalTitle}
                        </Typography>

                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            size="large">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <Divider
                    orientation="horizontal"
                />
                <DialogContent sx={{ maxHeight: "70vh" }}>
                    {children}
                </DialogContent>
            </Box>
        </Dialog>
    )
}

export default PopupModal