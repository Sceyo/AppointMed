/* eslint-disable react/prop-types */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import '../../App.css'
import React, { useState } from 'react';
import axios from 'axios';

import '../../App.css';

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
      type: 'dateTime',
      width: 400,
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

  ];

  const rows = [
    {
      id: 1,
      reason: 'Stomach ache',
      datetime: '2024-05-06T17:23',
      doctor: 'Dr. Nathan Pernites',
      status: 'Pending',
    },
    {
      id: 2,
      reason: 'Pregnant because of James Ng',
      datetime: '2024-05-09T17:23',
      doctor: 'Dr. James Winston Ng',
      status: 'Pending',
    },
  ];

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

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
            '.MuiSvgIcon-root': {
              color: '#D2042D',
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            const selectedIds = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIds.has(Number(row.id))
            );
            console.log('Selected row data', selectedRowData)
            setSelectedRows(selectedRowData);
          }}
          disableRowSelectionOnClick
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
