import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const appointments = {
  '2024-05-24': [
    {
      id: 1,
      doctor: 'Dr. Smith',
      reason: 'Check-up',
      date: '2024-05-24',
    },
    {
      id: 2,
      doctor: 'Dr. Johnson',
      reason: 'Surgery',
      date: '2024-05-24',
    },
  ],
  '2024-05-25': [
    {
      id: 3,
      doctor: 'Dr. Lee',
      reason: 'Consultation',
      date: '2024-05-25',
    },
    {
      id: 4,
      doctor: 'Dr. Brown',
      reason: 'Follow-up',
      date: '2024-05-25',
    },
  ],
};

export default function CalendarLayout() {
  const [value, setValue] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const appointment = appointments[dateString]?.find(
      (appointment) => appointment.date === dateString
    );
    setSelectedAppointment(appointment);
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={setValue}
          onClickDay={handleDateClick}
        />
      </LocalizationProvider>
      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onClose={() => setSelectedAppointment(null)}>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Doctor:</strong> {selectedAppointment.doctor}<br />
              <strong>Reason:</strong> {selectedAppointment.reason}<br />
              <strong>Date:</strong> {selectedAppointment.date}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedAppointment(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}