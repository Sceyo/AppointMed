import React from 'react';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

export default function Login({ show, handleCloseLogin }) {
    const handleSubmit = (event) => {
        event.preventDefault();
      
    };

    return (
        <Modal show={show} onHide={handleCloseLogin}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FormGroup controlId="formBasicEmail">
                        <FormLabel>Email address</FormLabel>
                        <FormControl type="email" placeholder="Enter email" />
                    </FormGroup>

                    <FormGroup controlId="formBasicPassword" style ={{marginTop: '15px'}}>
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" placeholder="Password" />
                    </FormGroup>

                    <FormGroup controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember Me" style ={{marginTop: '15px'}}/>
                    </FormGroup>

                    <Button variant="primary" type="submit" style ={{marginTop: '20px'}}> Login </Button>
                </Form>
            </Modal.Body>
    
        </Modal>
    );
}
