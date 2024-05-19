import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns';

const events = [
  { date: new Date(2022, 0, 5), title: 'Meeting with Dan Smith', time: '3:00 pm - 5:00 pm', location: 'Symu.co HQ' },
  { date: new Date(2022, 0, 7), title: 'Team meeting', time: '10:00 am - 11:00 am', location: 'Office' },
  { date: new Date(2022, 0, 12), title: 'New website presentation', time: '2:00 pm - 3:00 pm', location: 'Online' },
  { date: new Date(2022, 0, 20), title: 'Annual Report', time: 'All day', location: '' },
  { date: new Date(2022, 0, 21), title: 'Team meeting', time: '10:00 am - 11:00 am', location: 'Office' },
];

const SimpleCalendar = () => {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const onDateClick = (day) => {
    const event = events.find(event => isSameDay(event.date, day));
    setSelectedEvent(event || null);
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const dayEvents = events.filter(event => isSameDay(event.date, cloneDay));
      days.push(
        <div
          className={`flex-1 p-4 text-center border cursor-pointer ${!isSameMonth(day, monthStart) ? 'bg-gray-100 text-gray-400' : 'bg-white text-black'} ${isSameDay(day, new Date()) ? 'bg-blue-100' : ''}`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="number font-bold">{formattedDate}</span>
          {dayEvents.map((event, index) => (
            <div key={index} className="mt-1 text-xs bg-blue-200 text-blue-800 rounded p-1">
              {event.title}
            </div>
          ))}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="flex" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="relative flex flex-col w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex bg-gray-800 text-white p-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div className="flex-1 text-center font-bold" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div>{rows}</div>
      {selectedEvent && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-gray-700">Time: {selectedEvent.time}</p>
            <p className="text-gray-700">Location: {selectedEvent.location}</p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleCalendar;
