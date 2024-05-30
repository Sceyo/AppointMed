/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from 'react-icons/io5';
import { Divider } from '@mui/material';
import { useState, useEffect } from 'react';

export default function DeleteModal({ open, close, item }) {
  return (
    <Modal open={open} onClose={close}>
      <Box sx={styles.modal}>
        {/* Modal header */}
        <div
          className='flex flex-row content-center justify-end'
        >
          <IoClose size={30} className='flex flex-row hover:text-primary hover:bg-slate-100 hover:duration-150 rounded-md' onClick={close} />
        </div>
        <div className='flex flex-row justify-center my-2' id='modal-header'>
          <h1 className='text-3xl font-bold text-primary'>
            Delete Appointment
          </h1>
        </div>
        {/* Divider */}
        <Box mt={2} mb={2}>
          <Divider variant='middle' />
        </Box>
        {/* Delete message */}
        <div className='flex flex-row justify-center my-2'>
          <h1 className='text-xl text-nowrap'>
            Are you sure you want to delete the selected appointment(s)?
          </h1>
        </div>
        {/* Divider */}
        <Box mt={2} mb={2}>
          <Divider variant='middle' />
        </Box>
        <div className='flex flex-row justify-end px-4 my-2 mt-3'>
          <button className='p-2 px-4 mx-2 rounded-md bg-primary hover:bg-red-500 hover:duration-150 text-white text-2xl font-bold'>
            Submit
          </button>
          <button
            className='p-2 px-4 mx-2 rounded-md bg-gray-400 hover:bg-gray-500 hover:duration-150 text-white text-2xl font-bold'
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
}

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
};
