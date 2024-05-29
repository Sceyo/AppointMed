import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Divider } from '../common/Divider';
import Header from '../common/Header';
import AppointmentsLog from '../components/dashboard/ApptLog';
import Layout from './Layout';


export default function DashboardPage() {
  //  Used to navigate to other pages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        // Handle the response data
      } catch (error) {
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <Layout>
      <div className='flex flex-1 flex-col bg-slate-50'>
        <Header title='Dashboard' searchType={1} />
        <div className='inline-flex flex-row items-end px-16' id='dashboard-appt-num'>
          {/* Number of pending appointments */}
          <h1 className='text-[200px] leading-none font-bold text-primary'>
            8
          </h1>
          <h2 className='text-[75px] leading-none font-normal px-4 my-auto pb-3'>
            <span className='text-[45px] font-light'>pending</span> <br />appointments
          </h2>
        </div>
        <Divider />
        {/* Appointments log */}
        <AppointmentsLog />
      </div>
    </Layout>
  );
}
