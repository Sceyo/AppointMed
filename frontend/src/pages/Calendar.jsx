import Layout from './Layout';
import React from 'react';
import SimpleCalendar from '../components/SimpleCalendar';


export default function CalendarPage() {
    return (
        <Layout>
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-6">Calendar</h1>
          <SimpleCalendar />
        </div>
      </Layout>
    );
  }