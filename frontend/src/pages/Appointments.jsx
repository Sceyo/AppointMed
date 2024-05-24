import { useState } from 'react';
import AppointmentsTable from '../components/appointments/ApptTable';
import Header from '../common/Header';
import Layout from './Layout';
import { RiAddBoxLine, RiDeleteBinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import AppointmentModal from '../components/appointments/ApptModal';
import CreateAppt from '../components/appointments/CreateAppt.jsx';
import EditAppt from '../components/appointments/EditAppt';

export default function AppointmentsPage() {
  const [month, setMonth] = useState('2024-05');
  const [selectedRows, setSelectedRows] = useState([]);
  const [apptModal, showApptModal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const handleSetAppointment = () => {
    setIsPopupOpen(true); 
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); 
  };

  const handleEditAppointment = (appointment) => {
    setCurrentAppointment(appointment);
    setIsEditPopupOpen(true); 
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setCurrentAppointment(null);
  };





    return (
    <Layout>
      <div className='flex flex-1 flex-col bg-slate-50'>
        <Header title='Appointments' searchType={1} />
        {/* Action Bar */}
        <div className='flex flex-col px-16' id='appt-action-bar'>
          <div className='flex flex-1 my-2'>
            <input
              type='month'
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              name='appt-month'
              id='appt-month'
              className='border-2 border-slate-300 rounded-lg p-2 px-8 text-xl active:border-primary'
            />
          </div>
          <div className='flex flex-row my-2'>
            <button
              className='action-btn flex flex-row items-center'
              //onClick={() => showApptModal(true)} 
              onClick={handleSetAppointment}
            >
              <RiAddBoxLine size={20} style={{ marginRight: '8px' }} />
              Set Appointment
            </button>
            <button className='action-btn flex flex-row items-center'>
              <FaEdit size={20} style={{ marginRight: '8px' }} />
              Edit Appointment
            </button>
            <button className='action-btn flex flex-row items-center'>
              <RiDeleteBinLine size={20} style={{ marginRight: '8px' }} />
              Delete Appointment(s)
            </button>
          </div>
        </div>
        <AppointmentsTable
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
        {/* Appointment Modal */}
        {/* <AppointmentModal open={apptModal} close={() => showApptModal(false)} /> */}
        {/* <AppointmentsTable onEdit={handleEditAppointment} /> */}
        <CreateAppt showModal={isPopupOpen} handleClose={handleClosePopup} />
        <EditAppt showModal={isEditPopupOpen} handleClose={handleCloseEditPopup} appointment={currentAppointment} />
      
      </div>
    </Layout>
  );
}
