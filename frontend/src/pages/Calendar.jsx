import Layout from './Layout';
import CalendarLayout from '../components/calendar/CalendarLayout';
import Header from '../common/Header';

export default function CalendarPage() {
  return (
    <Layout>
      <div className='flex flex-1 flex-col bg-slate-50'>
        <Header title='Calendar' />
        <CalendarLayout />
      </div>
    </Layout>
  );
}
