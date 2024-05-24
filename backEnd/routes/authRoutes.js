const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    console.error("Error creating user:", error); 
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
