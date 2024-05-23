import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

export default function AppointmentModal({ open, close, item }) {
    return (
        <Modal
            open={open}
            onClose={close}
        >
            <Box sx={style}>
                <h1>penis</h1>
            </Box>
        </Modal>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };