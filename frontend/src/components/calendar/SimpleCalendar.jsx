import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, format, isSameMonth, isSameDay, parse } from 'date-fns';

const events = [
  { date: new Date(2024, 4, 5), title: 'Appointment Dan Smith', startTime: '15:00', endTime: '17:00' },
  { date: new Date(2024, 4, 7), title: 'Appointment Nich so Hawt', startTime: '10:00', endTime: '11:00' },
  { date: new Date(2024, 4, 21), title: 'Appointment Miko big coc', startTime: '14:00', endTime: '15:00' },
  { date: new Date(2024, 4, 21), title: 'Appointment Francis My Niggaaaaaaa', startTime: '00:00', endTime: '23:59' }, // All day event
  { date: new Date(2024, 4, 21), title: 'Appointment Dan Smith', startTime: '10:00', endTime: '11:00' },
];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const formatTime = (time) => {
    const parsedTime = parse(time, 'HH:mm', new Date());
    return format(parsedTime, 'hh:mm a');
  };

  const onDateClick = (day) => {
    const dayEvents = events
      .filter(event => isSameDay(event.date, day))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    setSelectedDateEvents(dayEvents);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Calculate the number of rows needed to always display 6 rows (42 days)
  const totalDays = [];
  while (day <= endDate || totalDays.length < 42) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const dayEvents = events.filter(event => isSameDay(event.date, cloneDay));
      days.push(
        <div
          className={`flex flex-col h-32 w-48 p-4 text-center border cursor-pointer transition duration-300 ease-in-out ${!isSameMonth(day, monthStart) ? 'bg-gray-100 text-gray-400' : 'bg-white text-black hover:bg-blue-200'} ${isSameDay(day, new Date()) ? 'bg-blue-100' : ''}`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="number font-bold">{formattedDate}</span>
          {dayEvents.map((event, index) => (
            <div key={index} className="mt-1 w-full p-1 text-xs bg-blue-200 text-blue-800 rounded">
              {event.title}
            </div>
          ))}
        </div>
      );
      day = addDays(day, 1);
    }
    totalDays.push(...days);
    rows.push(
      <div className="flex" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100 min-h-screen">
      <div className="relative flex flex-col w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center bg-white p-4 border-b">
          <div className="text-xl font-bold">{format(currentDate, 'MMMM yyyy')}</div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevMonth}
              className="px-4 py-2 border rounded hover:bg-gray-200"
            >
              &lt;
            </button>
            <button
              onClick={handleNextMonth}
              className="px-4 py-2 border rounded hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="flex bg-gray-800 text-white p-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div className="flex-1 text-center font-bold" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div>{rows}</div>
        {selectedDateEvents.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-100 mt-4 p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-2">Events</h2>
              {selectedDateEvents.map((event, index) => (
                <div key={index} className="mb-10">
                  <h3 className="text-lg font-semibold text-wrap">{event.title}</h3>
                  <p className="text-gray-700">Time: {formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                </div>
              ))}
              <button
                onClick={() => setSelectedDateEvents([])}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
