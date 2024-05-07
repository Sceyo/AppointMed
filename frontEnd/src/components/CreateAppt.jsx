import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

export default function CreateAppt() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
       
        handleClose(); 
    };

    return (
        <>
            <Button onClick={handleOpen}>Create Appointment</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Appointment</DialogTitle>
                <DialogContent>
                    <input type="text" placeholder="Title" />
                    <input type="text" placeholder="Content" />
                    <input type="datetime-local" placeholder="Time" />
                    <input type="datetime-local" placeholder="Date" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
