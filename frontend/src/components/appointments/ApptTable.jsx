import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

export default function AppointmentsTable({ setSelectedRows, setCanEdit, setCanDelete }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      if (user) {
        setLoading(true);
        try {
          const response = await axios.get(`http://127.0.0.1:3001/api/appointments/user/${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setAppointments(response.data.appointments); // Assuming the backend sends an array of appointments
        } catch (error) {
          console.error("Failed to fetch user's appointments:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserAppointments();
  }, [user]);

  const columns = [
    { field: 'id', headerName: 'No.', width: 70, flex: 0.5 },
    { field: 'reason', headerName: 'Reason for appointment', flex: 3 },
    { field: 'date', headerName: 'Date', type: 'DateTime', flex: 2 },
    { field: 'doctor', headerName: 'Doctor', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];

  return (
    <div className='flex flex-col w-[90%] my-2 mx-auto'>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={appointments}
          columns={columns}
          rowHeight={70}
          loading={loading}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            console.log('New Selection Model:', newSelectionModel);
            const selectedRowData = appointments.filter((row) =>
              newSelectionModel.includes(row.id)
            );
            console.log('Selected Row Data:', selectedRowData);
            setSelectedRows(selectedRowData);
            setCanEdit(newSelectionModel.length === 1);  // Enable edit only if one item is selected
            setCanDelete(newSelectionModel.length > 0);  // Enable delete if one or more items are selected
          }}
          sx={{
            fontSize: '18px',
            border: 'none',
            backgroundColor: 'white',
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '.MuiDataGrid-columnHeader': {
              color: 'white',
            },
            '.MuiSvg icon-root': {
              color: '#D2042D',
            },
          }}
          pageSize={5}
          disableSelectionOnClick
        />
      </ThemeProvider>
    </div>
  );
}

const theme = createTheme({
  mixins: {
    MuiDataGrid: {
      containerBackground: 'rgb(255, 87, 87, .79)',
    },
  },
});
