import { Divider } from '../common/Divider';
import Header from '../common/Header';
import AppointmentsLog from '../components/dashboard/ApptLog';
import Layout from './Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <div className='flex flex-1 flex-col bg-slate-50'>
        <Header title='Dashboard' searchType={1} />
        <div className='inline-flex flex-row items-end px-16' id='dashboard-appt-num'>
          <h1 className='text-[200px] leading-none font-bold text-primary'>
            8
          </h1>
          <h2 className='text-[75px] leading-none font-normal px-4 my-auto pb-3'><span className='text-[45px] font-light'>pending</span> <br/>appointments</h2>
        </div>
        <Divider />
        <AppointmentsLog />
      </div>
    </Layout>
  );
}
