import { Divider } from '../common/Divider';
import AppointmentsLog from '../components/dashboard/ApptLog';
import Layout from './Layout';
import { FaSearch } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <Layout>
      <div className='flex flex-1 flex-col bg-slate-50'>
        <div className='inline-flex flex-row p-16 pb-8' id='dashboard-header'>
          <div className='flex flex-1'>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
          </div>
          <div className='flex flex-row' id='dashboard-search'>
            <FaSearch
              style={{
                position: 'absolute',
                marginTop: '6px',
                padding: '4px',
                marginLeft: '10px',
                pointerEvents: 'none',
              }}
              size={22}
            />
            <input
              className='flex flex-row items-center bg-slate-300 rounded-md pl-10'
              placeholder='Search...'
            />
          </div>
        </div>
        <div className='inline-flex flex-row items-end px-16' id='dashboard-appt-num'>
          <h1 className='text-[200px] leading-none font-bold text-primary'>
            8
          </h1>
          <h2 className='text-[75px] px-4 pb-4'>appointments</h2>
        </div>
        <Divider />
        <AppointmentsLog />
      </div>
    </Layout>
  );
}
