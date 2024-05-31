require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const authenticateJWT = require('./middlewares/authenticateJWT');
const { apptRoute, userRoute } = require('./routes');

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://6659c1ba37abf627aeca2163--apptmed-appoint.netlify.app', // Use environment variable or default URL
  credentials: true
}));

app.use(express.json());

// Auth routes (login, register, etc.)
app.use('/auth', authRoutes);

// Appointment and User routes
app.use('/api', apptRoute);
app.use('/api', userRoute);

// Protected routes
app.use('/api', authenticateJWT, protectedRoutes); // Apply authenticateJWT to all /api routes

// Mock Prisma for test environment
if (process.env.NODE_ENV === 'test') {
  app.prisma = {
    user: {
      create: jest.fn(),
    },
  };
} else {
  app.prisma = prisma;
}

const port = process.env.PORT || 3306;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  prisma.$connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
      console.error('Database connection failed:', err);
      process.exit(1);
    });
});

module.exports = { app, prisma, server };
