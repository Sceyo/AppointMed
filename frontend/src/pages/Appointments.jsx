import React, { useState } from 'react';
import axios from 'axios';


export default function Appointments(){

    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    title,
                    content,
                    time,
                    date,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Appointment created successfully');
                setUserId('');
                setTitle('');
                setContent('');
                setTime('');
                setDate('');
            } else {
                alert(`Appointment was unsuccessful ${data.message}`);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Internal server error');
        }
    };




    return(
        <>
        
        
        
        
        
        </>
    )


}   