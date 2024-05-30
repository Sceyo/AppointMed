const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create appointment
router.post('/appointments', async (req, res) => {
    try {
        const { userId, reason, date, doctor } = req.body;
        console.log('Received request:', req.body); // Log received request

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const newAppointment = await prisma.appointment.create({
            data: {
                userId: parseInt(userId),
                reason,
                date: new Date(date),
                doctor
            }
        });

        res.status(201).json({ data: newAppointment });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all appointments
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await prisma.appointment.findMany();
        res.status(200).json({ data: appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get appointment by ID
router.get('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await prisma.appointment.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ data: appointment });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get appointments by User ID
router.get('/appointments/user/:userId', async (req, res) => {
    console.log("Fetching appointments for user ID:", req.params.userId);
    try {
        const { userId } = req.params;
        const userAppointments = await prisma.appointment.findMany({
            where: {
                userId: parseInt(userId)
            }
        });
        if (userAppointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this user" });
        }
        res.status(200).json({ appointments: userAppointments });
    } catch (error) {
        console.error("Error fetching user's appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update appointment
router.put('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, reason, date, doctor } = req.body;
        const updatedAppointment = await prisma.appointment.update({
            where: {
                id: parseInt(id)
            },
            data: {
                userId: parseInt(userId),
                reason,
                date: new Date(date),
                doctor
            }
        });
        res.status(200).json({ data: updatedAppointment });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete appointment
router.delete('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.appointment.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
