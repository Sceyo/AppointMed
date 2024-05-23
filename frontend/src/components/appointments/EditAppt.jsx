import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function EditAppt({ showModal, handleClose, appointment }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (appointment) {
      setTitle(appointment.reason);
      setContent(appointment.content);
      setTime(appointment.time);
      setDate(appointment.date);
    }
  }, [appointment]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/appointments/${appointment.id}`, {
        title,
        content,
        time,
        date
      });
      console.log('Appointment updated successfully');
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
