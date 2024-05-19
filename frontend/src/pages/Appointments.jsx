import { useState } from 'react';
import AppointmentsTable from '../components/appointments/ApptTable';
import Header from '../common/Header';
import Layout from './Layout';
import { RiAddBoxLine, RiDeleteBinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';

export default function AppointmentsPage() {
  const [month, setMonth] = useState('2024-05');

  return (
    <Layout>
      <div className='flex flex-1 flex-col bg-slate-50'>
        <Header title='Appointments' searchType={1} />
        <div className='flex flex-col px-16' id='appt-action-bar'>
          <div className='flex flex-1 my-2'>
            <input
              type='month'
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              name='appt-month'
              id='appt-month'
              className='border-2 border-slate-300 rounded-lg p-2 px-8 text-xl active:border-primary'
            />
          </div>
          <div className='flex flex-row my-2'>
            <button className='action-btn flex flex-row items-center'>
              <RiAddBoxLine size={20} style={{ marginRight: '8px' }} />
              Set Appointment
            </button>
            <button className='action-btn flex flex-row items-center'>
              <FaEdit size={20} style={{ marginRight: '8px' }} />
              Edit Appointment
            </button>
            <button className='action-btn flex flex-row items-center'>
              <RiDeleteBinLine size={20} style={{ marginRight: '8px' }} />
              Delete Appointment(s)
            </button>
          </div>
        </div>
        <AppointmentsTable />
      </div>
    </Layout>
  );
}
