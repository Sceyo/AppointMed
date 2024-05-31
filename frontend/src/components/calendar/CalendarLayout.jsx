import React, { useState, useEffect, useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import UserContext from '../../contexts/UserContext';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format: (date, formatStr, options) => format(date, formatStr, { locale: options.locale }),
  parse: (dateStr, formatStr, options) => parse(dateStr, formatStr, new Date(), { locale: options.locale }),
  startOfWeek: (date, options) => startOfWeek(date, { locale: options.locale }),
  getDay: (date) => getDay(date),
  locales,
});

export default function CalendarLayout() {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/appointments/user/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const appointmentsData = response.data.appointments.map(appointment => ({
          start: new Date(appointment.startTime),
          end: new Date(appointment.endTime),
          title: `Appointment with Dr. ${appointment.doctorName}`
        }));
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [user]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh', width: '100%' }}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <div>
          <h2>Appointment Details</h2>
          <p>Time: {format(selectedEvent.start, 'PPpp')}</p>
          <p>Details: {selectedEvent.title}</p>
        </div>
      )}
    </div>
  );
}
