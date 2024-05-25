import Layout from './Layout';
import CalendarLayout from '../components/calendar/CalendarLayout';
import Header from '../common/Header';
import '../App.css';

export default function CalendarPage() {
  return (
    <Layout>
      <div className="App">
        <Header title='Calendar' />
        <CalendarLayout />
      </div>
    </Layout>
  );
}
