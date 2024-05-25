require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // or your frontend URL
    credentials: true
}));

app.use(express.json());

app.use(passport.initialize());

app.use('/auth', routes.authRoute);
app.use('/user', routes.userRoute);
app.use('/appt', routes.apptRoute);

const authenticateJWT = require('./middlewares/authenticateJWT');

// Apply authenticateJWT to routes that need protection
app.use('/appt', authenticateJWT, routes.apptRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  prisma.$connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
      console.error('Database connection failed:', err);
      process.exit(1);
    });
});
