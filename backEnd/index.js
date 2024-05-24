require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const { Sequelize } = require('sequelize');
const routes = require('./routes');
require('./passportConfig'); // Ensure passportConfig is imported

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // or your frontend URL
  credentials: true
}));

app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './session.sqlite'
});

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(session({
  secret: process.env.SESSION_SECRET, // Use the secret from the .env file
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', routes.authRoute);
app.use('/user', routes.userRoute);
app.use('/appt', routes.apptRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
