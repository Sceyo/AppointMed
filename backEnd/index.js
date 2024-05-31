require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const authenticateJWT = require('./middlewares/authenticateJWT');
const { apptRoute, userRoute } = require('./routes');

const app = express();

app.use(cors({
  origin: 'https://6659c1ba37abf627aeca2163--apptmed-appoint.netlify.app', // or your frontend URL
  credentials: true
}));

app.use(express.json());

// Auth routes (login, register, etc.)
app.use('/auth', authRoutes);

app.use('/api', apptRoute);

app.use('/api', userRoute);

// Protected routes
app.use('/api', authenticateJWT, protectedRoutes); // Apply authenticateJWT to all /api routes

// Check if running in a test environment
if (process.env.NODE_ENV === 'test') {
  app.prisma = {
    user: {
      create: jest.fn(),
    },
  };
} else {
  // Define a mock object for prisma for non-test environments
  const mockPrisma = {
    user: {
      create: () => Promise.resolve({}),
    },
  };
  // Assign the mockPrisma to app.prisma
  app.prisma = mockPrisma;
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
