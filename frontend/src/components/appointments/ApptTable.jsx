/* eslint-disable react/prop-types */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import '../../App.css'
import React, { useState } from 'react';

export default function AppointmentsTable({ selectedRows, setSelectedRows }) {
  // const handleSelectionChange = (newSelection) => {
  //   setSelectedRows(newSelection);
  // }
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  const handleSelectionChange = (selection) => {
    const appointment = rows.find((row) => row.id === selection[0]);
    setSelectedAppointment(appointment);
  };

  const handleEditClick = () => {
    onEdit(selectedAppointment);
  };

  const handleDeleteAppointment = async () => {
    try {
      await axios.delete(`/appointments/${selectedAppointment.id}`);
      setRows(rows.filter(row => row.id !== selectedAppointment.id));
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Cannot delete it my good sir", error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'No.', width: 80 },
    {
      field: 'reason',
      headerName: 'Reason for appointment',
      width: 600,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
    },
    {
      field: 'doctor',
      headerName: 'Doctor',
      width: 400,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: () => (
        <Button variant="contained" color="primary" onClick={handleEditClick} disabled={!selectedAppointment}>
          Edit
        </Button>
      )
    },
    ];

  const rows = [
    { id: 1, reason: 'Stomach ache', date: '2024-06-17', doctor: 'Dr. Yo Mamma', status: 'Pending' },
    { id: 2, reason: 'Pregnant because of James Ng', date: '2024-07-30', doctor: 'Dr. James Winston D. Ng', status: 'Pending' },
  ]

  useEffect(() => {
    console.log(selectedRows)
  }, [selectedRows])

  return (
    <div className='flex flex-col h-[70%] my-2 px-16'>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={70}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
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
            }
          }}

          pageSizeOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(row) => setSelectedRows(row)}
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleSelectionChange}
        />
      </ThemeProvider>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteAppointment}
        disabled={!selectedAppointment}
      >
        Delete Appointment
      </Button>
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