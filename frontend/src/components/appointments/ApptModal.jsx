/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from 'react-icons/io5';
import { Divider } from '@mui/material';
import { useState, useEffect } from 'react';

export default function AppointmentModal({ open, close, item }) {
  //  Form data
  const [formData, setFormData] = useState({
    reason: '',
    datetime: new Date(),
    doctor: '',
  });

  //  Sets the form data if there is a selected item (edit appointment btn)
  useEffect(() => {
    if (item.length === 1) {
      setFormData({
        reason: item[0].reason,
        datetime: item[0].datetime,
        doctor: item[0].doctor,
      })
    }
  }, [item])

  return (
    <Modal open={open} onClose={close}>
      <Box sx={styles.modal}>
        {/* Modal header */}
        <div className='flex flex-row items-center my-2' id='modal-header'>
          {/* Action title */}
          <div className='flex flex-1 px-4'>
            <h1 className='text-3xl font-bold text-primary'>
              {item?.length !== 0 ? 'Edit the appointment' : 'Set an appointment'}
            </h1>
          </div>
          {/* Close button */}
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
        {/* Reason for appointment input field */}
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
        {/* Date and time input field */}
        <div className='flex flex-col my-2 px-4'>
          <label htmlFor='datetime' className='text-xl'>
            Date and time
          </label>
          <input
            id='datetime'
            type='datetime-local'
            defaultValue={formData.datetime}
            onChange={(event) =>
              setFormData({ ...formData, datetime: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wide focus:outline-red-300'
          />
        </div>
        {/* Select doctor input field */}
        <div className='flex flex-col my-2 px-4'>
          <label htmlFor='reason-for-appt' className='text-xl'>
            Select an available doctor
          </label>
          <select
            defaultValue={formData.doctor}
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
        {/* Modal button group */}
        <div className='flex flex-row justify-end px-4 my-2 mt-3'>
            <button className='p-2 px-4 mx-2 rounded-md bg-primary hover:bg-secondary hover:duration-150 text-white text-2xl font-bold'>Submit</button>
            <button className='p-2 px-4 mx-2 rounded-md bg-gray-400 hover:bg-gray-500 hover:duration-150 text-white text-2xl font-bold' onClick={close}>Cancel</button>
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
