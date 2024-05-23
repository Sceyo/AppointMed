import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function AppointmentsTable({ onEdit }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const rows = [
    { id: 1, reason: 'Stomach ache', date: '2024-06-17', doctor: 'Dr. Yo Mamma', status: 'Pending' },
    { id: 2, reason: 'Pregnant because of James Ng', date: '2024-07-30', doctor: 'Dr. James Winston D. Ng', status: 'Pending' },
  ];

  const handleSelectionChange = (selection) => {
    const appointment = rows.find((row) => row.id === selection[0]);
    setSelectedAppointment(appointment);
  };

  const handleEditClick = () => {
    onEdit(selectedAppointment);
  };

  const columns = [
    { field: 'id', headerName: 'No.', width: 90 },
    { field: 'reason', headerName: 'Reason for appointment', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'doctor', headerName: 'Doctor', width: 200 },
    { field: 'status', headerName: 'Status', width: 160 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: () => (
        <Button variant="contained" color="primary" onClick={handleEditClick} disabled={!selectedAppointment}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
}
