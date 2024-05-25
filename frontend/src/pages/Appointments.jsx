/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import AppointmentsTable from '../components/appointments/ApptTable';
import Header from '../common/Header';
import Layout from './Layout';
import { RiAddBoxLine, RiDeleteBinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import AppointmentModal from '../components/appointments/ApptModal';
import DeleteModal from '../components/appointments/DeleteModal';

export default function AppointmentsPage() {
  const [month, setMonth] = useState('2024-05');
  const [selectedRows, setSelectedRows] = useState([]);
  const [apptModal, showApptModal] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);
  let rowsNum = selectedRows?.length;

  useEffect(() => {
    rowsNum = selectedRows?.length;
  }, [selectedRows])

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
              onClick={() => showApptModal(true)}
              disabled={!(rowsNum < 1)}
            >
              <RiAddBoxLine size={20} style={{ marginRight: '8px' }} />
              Set Appointment
            </button>
            <button className='action-btn flex flex-row items-center' onClick={() => showApptModal(true)} disabled={!(rowsNum === 1)}>
              <FaEdit size={20} style={{ marginRight: '8px' }} />
              Edit Appointment
            </button>
            <button className='action-btn flex flex-row items-center' onClick={() => showDeleteModal(true)} disabled={!(rowsNum > 0)}>
              <RiDeleteBinLine size={20} style={{ marginRight: '8px' }} />
              Delete Appointment(s)
            </button>
          </div>
        </div>
        <AppointmentsTable
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
        {/* Modals */}
        <AppointmentModal open={apptModal} close={() => showApptModal(false)} item={selectedRows} />
        <DeleteModal open={deleteModal} close={() => showDeleteModal(false)} />
      </div>
    </Layout>
  );
}
