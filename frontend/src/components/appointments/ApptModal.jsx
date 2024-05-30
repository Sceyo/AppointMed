/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from 'react-icons/io5';
import { Divider } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

export default function AppointmentModal({ open, close, item }) {
  const [formData, setFormData] = useState({
    id: null,  // Optional field for edits
    reason: '',
    date: new Date().toISOString().slice(0, 16), // Initialize with current date
    doctor: '',
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (item && item.length === 1) {
      setFormData({
        id: item[0].id, // Assuming 'id' exists in the item data
        reason: item[0].reason,
        date: item[0].date.slice(0, 16),  // Ensuring datetime is in the correct format
        doctor: item[0].doctor,
      });
    } else {
      setFormData({ // Reset form when closed or no item is selected
        id: null,
        reason: '',
        date: new Date().toISOString().slice(0, 16),
        doctor: '',
      });
    }
  }, [item, open]);

  const handleSubmit = async () => {
    if (!user || !user.id) {
      alert("User ID is missing. Please ensure you're logged in and try again.");
      return;
    }

    const appointmentData = {
      userId: user.id,
      reason: formData.reason,
      date: formData.date,
      doctor: formData.doctor,
    };

    try {
      const url = 'http://127.0.0.1:3001/api/appointments';
      if (formData.id) {
        // Update existing appointment
        await axios.put(`${url}/${formData.id}`, appointmentData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        // Create new appointment
        await axios.post(url, appointmentData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      close(); // Close the modal on success
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Failed to submit appointment: ' + error.message);
    }
  };

  return (
    <Modal open={open} onClose={close}>
      <Box sx={styles.modal}>
        <div className='flex flex-row items-center my-2' id='modal-header'>
          <div className='flex flex-1 px-4'>
            <h1 className='text-3xl font-bold text-primary'>
              {formData.id ? 'Edit the appointment' : 'Set an appointment'}
            </h1>
          </div>
          <div className='hover:bg-slate-100 hover:duration-150 rounded-md mr-2 content-center px-1' onClick={close}>
            <IoClose size={30} className='hover:text-primary' />
          </div>
        </div>
        <Divider variant='middle' />
        {/* Form elements (reason, date, doctor) remain unchanged */}
        {/* Submit and Cancel buttons */}
        <div className='flex flex-row justify-end px-4 my-2 mt-3'>
          <button onClick={handleSubmit} className='bg-primary hover:bg-red-500 text-white font-bold p-2 rounded-md'>Submit</button>
          <button onClick={close} className='ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold p-2 rounded-md'>Cancel</button>
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
