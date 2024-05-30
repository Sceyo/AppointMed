import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

export default function AppointmentsLog() {
  const { user } = useContext(UserContext); // Accessing user context to get the current user
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        console.log(`Fetching appointments for user ID: ${user.id} with URL: http://127.0.0.1:3001/api/appointments/user/${user.id}`);
        try {
          const response = await axios.get(`http://127.0.0.1:3001/api/appointments/user/${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
          });

          setAppointments(response.data.appointments);
        } catch (error) {
          console.error('Failed to fetch appointments:', error);
        }
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div className='flex flex-col w-[90%] my-2 mx-auto'>
      <div className='my-2 mb-4'>
        <h1 className='text-2xl'>Appointments Log</h1>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='appointments log'>
          <TableHead>
            <TableRow sx={styles.th}>
              <TableCell align='left' sx={styles.thCell}>
                Reason for appointment
              </TableCell>
              <TableCell align='center' sx={styles.thCell}>
                Doctor
              </TableCell>
              <TableCell align='right' sx={styles.thCell}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row' sx={styles.tc}>
                  {appointment.reason}
                </TableCell>
                <TableCell align='center' sx={styles.tc}>{appointment.doctor}</TableCell>
                <TableCell align='right' sx={styles.tc}>{new Date(appointment.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const styles = {
  th: {
    backgroundColor: 'rgb(255,87,87, .79)',
  },

  thCell: {
    fontSize: '18px',
    color: 'white',
    fontWeight: 'bold',
    paddingY: 3,
    paddingX: 4,
  },

  tc: {
    fontSize: '18px',
    paddingY: 3,
    paddingX: 4,
  },
};
