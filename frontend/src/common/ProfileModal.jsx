/* eslint-disable react/prop-types */
import { Popover } from '@mui/material';
import { FaRegCircleUser } from 'react-icons/fa6';
import { RiLogoutBoxLine } from 'react-icons/ri';

export default function ProfilePopover({ id, open, close, anchorEl }) {
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
      <div className='flex flex-col w-60 items-center '>
        <div className='flex w-full flex-row justify-center items-center py-2 hover:bg-primary hover:text-white hover:font-bold hover:duration-150 hover:cursor-pointer'>
          <FaRegCircleUser size={20} style={{ marginRight: '6px' }} />
          <h1 className='text-xl'>User Profile</h1>
        </div>
        <div className='flex w-full flex-row justify-center items-center py-2 hover:bg-primary hover:text-white hover:font-bold hover:duration-150 hover:cursor-pointer'>
          <RiLogoutBoxLine size={20} style={{ marginRight: '6px' }} />
          <h1 className='text-xl'>Logout</h1>
        </div>
      </div>
    </Popover>
  );
}
