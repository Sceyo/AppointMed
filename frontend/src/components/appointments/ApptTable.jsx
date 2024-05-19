// import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function AppointmentsTable() {
  const columns = [
    { field: 'id', headerName: 'No.', width: 90 },
    {
      field: 'reason',
      headerName: 'Reason for appointment',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
    },
    {
      field: 'doctor',
      headerName: 'Doctor',
      type: 'number',
      width: 110,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
    },
  ];

  const rows = [
    { id: 1, reason: 'Stomach ache', date: '2024-06-17', doctor: 'Dr. Yo Mamma', status: 'Pending' },
    { id: 2, reason: 'Pregnant because of James Ng', date: '2024-07-30', doctor: 'Dr. James Winston D. Ng', status: 'Pending' },
  ]

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
      />
    </div>
  );
}
