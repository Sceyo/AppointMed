import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import CalendarPage from './pages/Calendar.jsx';
import AppointmentsPage from './pages/Appointments.jsx';
import ProfilePage from './pages/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/appointments',
    element: <AppointmentsPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
