const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT');
const jwt = require('jsonwebtoken');

// Create User 
router.post('/user', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });
    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users 
router.get('/user', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a specific user 
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
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
router.put('/user/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, confirmPassword } = req.body;

    console.log('Received update request for user ID:', id);
    console.log('Request body:', req.body);

    if (!name || !email || !password || !confirmPassword) {
      console.log('Validation Error: All fields are required');
      return res.status(401).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      console.log('Validation Error: Passwords do not match');
      return res.status(401).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log('User updated successfully:', updatedUser);
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
    await prisma.user.delete({
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

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Attempt:', { email, password });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log('User found:', user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Invalid login attempt:', { email });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', redirectUrl: '/dashboard' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
