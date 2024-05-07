const router = require("express").Router();
const database = require("../prisma/database");


//Create User 
router.post('/user', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const newUser = await database.user.create({
            data: {
                name,
                email,
                password,
                confirmPassword
            }
        });
        res.status(201).json({ data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Get all users 
router.get('/user', async (req, res) => {
    try {
        const users = await database.user.findMany();
        res.status(200).json({ data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//get a specific user 
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await database.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Update User
router.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, confirmPassword } = req.body;
        const updatedUser = await database.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                email,
                password,
                confirmPassword
            }
        });
        res.status(200).json({ data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete User
router.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await database.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;