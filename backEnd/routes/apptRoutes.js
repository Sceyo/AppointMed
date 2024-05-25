const router = require("express").Router();
const database = require("../prisma/database");

// Create appointment
router.post('/appointments', async (req, res) => {
    try {
        const { userId, title, content, time, date } = req.body;
        console.log('Received request:', req.body); // Log received request

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const newAppointment = await prisma.appointment.create({
            data: {
                userId: parseInt(userId),
                title,
                content,
                time: new Date(time),
                date: new Date(date)
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
        const appointments = await database.appointment.findMany();
        res.status(200).json({ data: appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get appointment ID
router.get('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await database.appointment.findUnique({
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

// Update appointment
router.put('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, title, content, time, date } = req.body;
        const updatedAppointment = await database.appointment.update({
            where: {
                id: parseInt(id)
            },
            data: {
                userId: parseInt(userId),
                title,
                content,
                time: new Date(time),
                date: new Date(date)
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
        await database.appointment.delete({
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
