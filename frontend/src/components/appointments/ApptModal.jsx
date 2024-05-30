/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from 'react-icons/io5';
import { Divider } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';


export default function AppointmentModal({ open, close, item }) {
  console.log('Item',item)
  const [formData, setFormData] = useState({
    reason: '',
    date: new Date(),
    doctor: '',
  });

  const { user } = useContext(UserContext);
  console.log(item)

  useEffect(() => {
    if (item && item.length === 1) {
      setFormData({
        reason: item[0].reason,
        date: item[0].date.slice(0, 16),  // Ensure datetime is in the correct format
        doctor: item[0].doctor,
      });
    } else {
      // Reset form when closed or no item is selected
      setFormData({
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
      userId: user.id,  // Using user ID from context
      reason: formData.reason,
      date: formData.date,
      doctor: formData.doctor
    };

    try {
      await axios.post('http://127.0.0.1:3001/api/appointments', appointmentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      close(); // Close the modal on success
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Failed to submit appointment: ' + error.message);
    }
  };

  return (
    <Modal open={open} onClose={close}>
      <Box sx={styles.modal}>
        {/* Modal header */}
        <div className='flex flex-row items-center my-2' id='modal-header'>
          <div className='flex flex-1 px-4'>
            <h1 className='text-3xl font-bold text-primary'>
              {item?.length !== 0 ? 'Edit the appointment' : 'Set an appointment'}
            </h1>
          </div>
          <div
            className='hover:bg-slate-100 hover:duration-150 rounded-md mr-2 content-center px-1'
            onClick={close}
          >
            <IoClose size={30} className='hover:text-primary' />
          </div>
        </div>
        {/* Divider */}
        <Box mt={2} mb={2}>
          <Divider variant='middle' />
        </Box>
        {/* Reason for appointment */}
        <div className='flex flex-col my-2 px-4'>
          <label htmlFor='reason-for-appt' className='text-xl'>
            Reason for appointment
          </label>
          <input
            id='reason-for-appt'
            type='text'
            value={formData.reason}
            onChange={(event) =>
              setFormData({ ...formData, reason: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wide focus:outline-red-300'
          />
        </div>
        {/* Date and time */}
        <div className='flex flex-col my-2 px-4'>
          <label htmlFor='date' className='text-xl'>
            Date and time
          </label>
          <input
            id='date'
            type='datetime-local'
            defaultValue={formData.date}
            onChange={(event) =>
              setFormData({ ...formData, date: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wide focus:outline-red-300'
          />
        </div>
        {/* Select doctor */}
        <div className='flex flex-col my-2 px-4'>
          <label htmlFor='reason-for-appt' className='text-xl'>
            Select an available doctor
          </label>
          <select
            defaultValue={formData.doctor}
            // value={formData.doctor}
            onChange={(event) =>
              setFormData({ ...formData, doctor: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wide appearance-none focus:outline-red-300'
          >
            <option value='' disabled hidden>
              Choose your doctor
            </option>
            <option value='Dr. Nicholai Oblina'>Dr. Nicholai Oblina</option>
            <option value='Dr. Francis Aliser'>Dr. Francis Aliser</option>
            <option value='Dr. Nathan Pernites'>Dr. Nathan Pernites</option>
            <option value='Dr. James Winston Ng'>Dr. James Winston Ng</option>
          </select>
        </div>
        {/* Divider */}
        <Box mt={2} mb={2}>
          <Divider variant='middle' />
        </Box>
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
