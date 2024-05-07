import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

export default function Register({ show, handleCloseRegister }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData); 
        handleCloseRegister(); // Changed to handleCloseRegister
    };

    return (
        <>
            <Modal show={show} onHide={handleCloseRegister}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup controlId="formBasicName">
                            <FormLabel>Name</FormLabel>
                            <FormControl type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} required />
                        </FormGroup>

                        <FormGroup controlId="formBasicEmail" style ={{marginTop: '15px'}}>
                            <FormLabel>Email address</FormLabel>
                            <FormControl type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
                        </FormGroup>

                        <FormGroup controlId="formBasicPassword" style ={{marginTop: '15px'}}>
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                        </FormGroup>

                        <FormGroup controlId="formBasicConfirmPassword" style ={{marginTop: '15px'}}>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
                        </FormGroup>
                        
                        <Button variant="primary" type="submit" style ={{marginTop: '30px'}}>
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
