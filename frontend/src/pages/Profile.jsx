// /src/ProfilePage.jsx

import '../App.css';
import { useState, useEffect, useContext } from 'react';
import { IoMdReturnLeft } from 'react-icons/io';
import { AiOutlineSave } from 'react-icons/ai';
import { Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import AuthContext from '../contexts/AuthContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const { token, logout } = useContext(AuthContext);

  const [disabled, setDisabled] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  useEffect(() => {
    setDisabled(
      !userData.name || 
      !userData.email || 
      !userData.password || 
      userData.password !== userData.confirmPassword
    );
  }, [userData]);

  const handleSaveChanges = async () => {
    console.log('Save Changes Button Clicked');
    console.log('User ID:', user.id);
    console.log('User Data to Update:', userData);

    console.log('Token:', token); // Log the token to verify it's fetched correctly

    if (!token) {
      alert('Authentication token is missing. Please log in again.');
      logout(); // Ensure user is logged out if token is missing
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:3001/api/user/${user.id}`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('API Response:', response);

      if (response.status === 200) {
        console.log('Profile updated successfully:', response.data.data);
        updateUser(response.data.data);
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className='main-container'>
      <div className='flex flex-row items-center p-16'>
        <div
          className='flex flex-1 flex-row items-center cursor-pointer font-bold hover:text-primary hover:duration-150'
          onClick={() => navigate('/dashboard')}
        >
          <IoMdReturnLeft size={30} style={{ marginRight: '10px' }} />
          <h1 className='text-2xl'>Return to dashboard</h1>
        </div>
        <div className='flex items-center'>
          <h1 className='text-4xl font-bold tracking-wide pb-1'>
            appoint
            <span className='font-extrabold text-red-400 pl-0.5'>Med</span>
          </h1>
        </div>
      </div>
      <div className='flex flex-1 flex-col mx-auto w-2/4 p-16 px-32 bg-zinc-300 bg-opacity-5 shadow-lg rounded-lg'>
        <div className='flex flex-row justify-center my-2 mb-6'>
          <h1 className='text-4xl font-bold text-primary'>User Profile</h1>
        </div>
        <div className='flex flex-col my-2'>
          <label className='text-2xl pr-3 font-medium mb-2'>Name:</label>
          <input
            placeholder='Name'
            type='text'
            value={userData.name}
            onChange={(event) =>
              setUserData({ ...userData, name: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl drop-shadow-md border-solid border-2 border-black border-opacity-10 text-xl tracking-wide focus:outline-red-300'
          />
        </div>
        <div className='flex flex-col my-2'>
          <label className='text-2xl pr-3 font-medium mb-2'>Email:</label>
          <input
            placeholder='Email'
            type='email'
            value={userData.email}
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl drop-shadow-md border-solid border-2 border-black border-opacity-10 text-xl tracking-wide focus:outline-red-300'
          />
        </div>
        <div className='flex flex-col my-2'>
          <label className='text-2xl pr-3 font-medium mb-2'>Password:</label>
          <input
            placeholder='Password'
            type='password'
            value={userData.password}
            onChange={(event) =>
              setUserData({ ...userData, password: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl drop-shadow-md border-solid border-2 border-black border-opacity-10 text-xl tracking-wide focus:outline-red-300'
          />
        </div>
        <div className='flex flex-col my-2'>
          <label className='text-2xl pr-3 font-medium mb-2'>Confirm password:</label>
          <input
            placeholder='Confirm password'
            type='password'
            value={userData.confirmPassword}
            onChange={(event) =>
              setUserData({ ...userData, confirmPassword: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl drop-shadow-md border-solid border-2 border-black border-opacity-10 text-xl tracking-wide focus:outline-red-300'
          />
        </div>
        <Box mt={2} mb={2}>
          <Divider variant='middle' />
        </Box>
        <div className='flex flex-row justify-end px-4 my-2 mt-3'>
          <button
            className='flex flex-row items-center p-2 px-4 mx-2 rounded-md bg-primary hover:bg-secondary hover:duration-150 disabled:bg-slate-500-100 text-white text-2xl font-bold'
            disabled={disabled}
            onClick={handleSaveChanges}
          >
            <AiOutlineSave size={30} style={{ paddingRight: '10px' }} />
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
