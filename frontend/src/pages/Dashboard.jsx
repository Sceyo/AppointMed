import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Divider } from '../common/Divider';
import Header from '../common/Header';
import AppointmentsLog from '../components/dashboard/ApptLog';
import Layout from './Layout';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';

export default function DashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const { token } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/appointments/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data.appointments.slice(0, 5)); // Limit to 5 entries
      } catch (error) {
        console.error('Failed to fetch appointments:', error); // Log the error
      }
    };

    if (user && token) {
      fetchData();
    }
  }, [navigate, token, user]);

  return (
    <Layout>
      <div className='flex flex-1 flex-col bg-slate-50'>
        <Header title='Dashboard' searchType={1} />
        <div className='inline-flex flex-row items-end px-16' id='dashboard-appt-num'>
          <h1 className='text-[200px] leading-none font-bold text-primary'>
            {appointments.length}
          </h1>
          <h2 className='text-[75px] leading-none font-normal px-4 my-auto pb-3'>
            <span className='text-[45px] font-light'>pending</span> <br />appointments
          </h2>
        </div>
        <Divider />
        <AppointmentsLog appointments={appointments} />
      </div>
    </Layout>
  );
}
