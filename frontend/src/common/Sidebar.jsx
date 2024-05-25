import '../App.css';
import Logo from '../assets/appointMed-logo.svg';
import ProfilePopover from './ProfileModal';
import { RxDashboard } from 'react-icons/rx';
import { FaUserDoctor, FaRegCalendar, FaRegCircleUser } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { isActivePath } from './GlobalFunc';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profilePopover, showProfilePopover] = useState(null);

  const handleOpen = (event) => {
    showProfilePopover(event.currentTarget);
  }

  const handleClose = () => {
    showProfilePopover(null);
  }

  const open = Boolean(profilePopover);
  const id = open ? 'profile-popover' : undefined;

  return (
    <div className='w-1/6 flex flex-col bg-slate-50 drop-shadow-md items-center'>
      <div className='p-2' id='app-logo'>
        <img src={Logo} alt='appMed-logo' style={{ width: '120px' }} />
      </div>
      <div className='flex flex-col h-4/5 items-left' id='sidebar-items'>
        <div
          className='flex flex-row items-center mb-2 p-3 px-5 justify-left content-center'
          id={isActivePath(location, 'dashboard')}
          onClick={() => navigate('/dashboard')}
        >
          <RxDashboard style={{ marginRight: '20px' }} size={24} />
          <h1 className='text-2xl font-bold'>Dashboard</h1>
        </div>
        <div
          className='flex flex-row items-center mb-2 p-3 px-5 justify-left content-center'
          id={isActivePath(location, 'appointments')}
          onClick={() => navigate('/appointments')}
        >
          <FaUserDoctor style={{ marginRight: '20px' }} size={24} />
          <h1 className='text-2xl font-bold'>Appointments</h1>
        </div>
        <div
          className='flex flex-row items-center mb-2 p-3 px-5 justify-left content-center'
          id={isActivePath(location, 'calendar')}
          onClick={() => navigate('/calendar')}
        >
          <FaRegCalendar style={{ marginRight: '20px' }} size={24} />
          <h1 className='text-2xl font-bold'>Calendar</h1>
        </div>
        <div className='flex flex-col mt-auto items-center'>
          <FaRegCircleUser
            style={{ marginBottom: 6 }}
            size={40}
            aria-describedby={id}
            id='sidebar-item'
            onClick={handleOpen}
          />
          <ProfilePopover
            id={id}
            anchorEl={profilePopover}
            open={open}
            close={handleClose}
          />
          <h1 className='text-xl'>Nicholai Oblina</h1>
        </div>
      </div>
    </div>
  );
}
