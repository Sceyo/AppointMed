import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AppointmentsLog() {
  return (
    <div className='flex flex-col w-[90%] my-2 mx-auto'>
      {/* Header */}
      <div className='my-2 mb-4'>
        <h1 className='text-2xl'>Appointments Log</h1>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='appointments log'>
          {/* Table headers */}
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
            <TableRow
              key={'something'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row' sx={styles.tc}>
                Stomach ache
              </TableCell>
              <TableCell align='center' sx={styles.tc}>Dr. Nicodemus Oblation</TableCell>
              <TableCell align='right' sx={styles.tc}>09-11-1991</TableCell>
            </TableRow>
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
