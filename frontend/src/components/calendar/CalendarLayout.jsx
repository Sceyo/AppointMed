import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

const appointments = [
  { start: new Date(2024, 4, 24, 10, 0), end: new Date(2024, 4, 24, 11, 0), title: 'Routine check-up with Dr. Smith' },
  { start: new Date(2024, 4, 24, 13, 0), end: new Date(2024, 4, 24, 14, 0), title: 'Consultation with Dr. Jones' },
  { start: new Date(2024, 4, 25, 11, 0), end: new Date(2024, 4, 25, 12, 0), title: 'Follow-up on lab results with Dr. Brown' }
];

export default function CalendarLayout() {
  const [selectedEvent, setSelectedEvent] = useState(null);

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

