/* eslint-disable react/prop-types */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../../App.css';

export default function AppointmentsTable({ selectedRows, setSelectedRows }) {
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
