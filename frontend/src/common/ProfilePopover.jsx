/* eslint-disable react/prop-types */
import { Popover } from '@mui/material';
import { FaRegCircleUser } from 'react-icons/fa6';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function ProfilePopover({ id, open, close, anchorEl }) {
  //  Used to navigate to other pages
  const navigate = useNavigate();

  return (
    <Popover
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={close}
      sx={{
        mx: 2,
      }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      {/* Popover buttons */}
      <div className='flex flex-col w-60 items-center '>
        {/* User profile button */}
        <div className='flex w-full flex-row justify-center items-center py-2 hover:bg-primary hover:text-white hover:font-bold hover:duration-150 hover:cursor-pointer' onClick={() => navigate('/profile')}>
          <FaRegCircleUser size={20} style={{ marginRight: '6px' }} />
          <h1 className='text-xl'>User Profile</h1>
        </div>
        {/* Logout button */}
        <div className='flex w-full flex-row justify-center items-center py-2 hover:bg-primary hover:text-white hover:font-bold hover:duration-150 hover:cursor-pointer'>
          <RiLogoutBoxLine size={20} style={{ marginRight: '6px' }} />
          <h1 className='text-xl'>Logout</h1>
        </div>
      </div>
    </Popover>
  );
}
