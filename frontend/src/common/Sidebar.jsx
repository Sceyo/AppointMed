// Sidebar.js
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import '../App.css';
import Logo from '../assets/appointMed-logo.svg';
import ProfilePopover from './ProfilePopover';
import { FaUserDoctor, FaRegCalendar, FaRegCircleUser } from 'react-icons/fa6';
import { isActivePath } from './GlobalFunc';
import UserContext from '../contexts/UserContext';

function Sidebar() {
  // Used to navigate to other pages
  const navigate = useNavigate();

  // For displaying the profile popover
  const [profilePopover, showProfilePopover] = useState(null);

  // Get user data from UserContext
  const { user } = useContext(UserContext);

  // Handles the popover opening
  const handleOpen = (event) => {
    showProfilePopover(event.currentTarget);
  };

  // Handles the popover closing
  const handleClose = () => {
    showProfilePopover(null);
  };

  // Checks if popover's status (open or close)
  const open = Boolean(profilePopover);
  const id = open ? 'profile-popover' : undefined;

  return (
    <div className="w-1/6 flex flex-col bg-slate-50 drop-shadow-md items-center">
      {/* Logo */}
      <div className="p-2" id="app-logo">
        <img src={Logo} alt="appMed-logo" style={{ width: '120px' }} />
      </div>
      {/* Sidebar items */}
      <div className="flex flex-col h-4/5 items-left" id="sidebar-items">
        {/* Dashboard button */}
        <div
          className="flex flex-row items-center mb-2 p-3 px-5 justify-left content-center"
          id={isActivePath(location, 'dashboard')}
          onClick={() => navigate('/dashboard')}
        >
          <RxDashboard style={{ marginRight: '20px' }} size={24} />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        {/* Appointments button */}
        <div
          className="flex flex-row items-center mb-2 p-3 px-5 justify-left content-center"
          id={isActivePath(location, 'appointments')}
          onClick={() => navigate('/appointments')}
        >
          <FaUserDoctor style={{ marginRight: '20px' }} size={24} />
          <h1 className="text-2xl font-bold">Appointments</h1>
        </div>
        {/* Calendar button */}
        <div
          className="flex flex-row items-center mb-2 p-3 px-5 justify-left content-center"
          id={isActivePath(location, 'calendar')}
          onClick={() => navigate('/calendar')}
        >
          <FaRegCalendar style={{ marginRight: '20px' }} size={24} />
          <h1 className="text-2xl font-bold">Calendar</h1>
        </div>
        {/* User button */}
        <div className="flex flex-col mt-auto items-center">
          <FaRegCircleUser
            style={{ marginBottom: 6 }}
            size={40}
            aria-describedby={id}
            id="sidebar-item"
            onClick={handleOpen}
          />
          {/* Popover for settings and logout */}
          <ProfilePopover
            id={id}
            anchorEl={profilePopover}
            open={open}
            close={handleClose}
          />
          <h1 className="text-xl">
            {user ? `${user.name}` : 'Guest'} {/* Display user's name */}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
