// import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../../App.css'

export default function AppointmentsTable() {
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
      width: 300,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    },
  ];

  const rows = [
    { id: 1, reason: 'Stomach ache', date: '2024-06-17', doctor: 'Dr. Yo Mamma', status: 'Pending' },
    { id: 2, reason: 'Pregnant because of James Ng', date: '2024-07-30', doctor: 'Dr. James Winston D. Ng', status: 'Pending' },
  ]

  return (
    <div className='flex flex-1 my-1 px-16'>
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
        rowHeight={70}
        sx={{ 
          fontSize: '18px',
          padding: '10px',
          border: 'none',
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}