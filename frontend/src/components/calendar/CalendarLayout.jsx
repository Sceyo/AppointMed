import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarLayout() {
  const [value, onChange] = useState(new Date());

  return (
      <div className='flex flex-row items-center justify-center'>
        <Calendar onChange={onChange} value={value} />
      </div>

  );
}
