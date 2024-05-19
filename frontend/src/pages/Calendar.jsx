import Layout from './Layout';
import React from 'react';
import SimpleCalendar from '../components/calendar/SimpleCalendar';


export default function CalendarPage() {
    return (
        <Layout>
          <SimpleCalendar />
        </Layout>
    );
  }