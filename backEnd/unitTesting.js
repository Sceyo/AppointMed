const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { database } = require('./prisma/database');
const router = require('./routes');

const app = express();
app.use(express.json());
app.use(router);

jest.mock('bcrypt');
jest.mock('./prisma/database');
jest.mock('passport');

describe('Auth Routes', () => {
  let registeredUser;

  //Registers the test user for this unit Testing
  beforeAll(async () => {
    registeredUser = {
      id: 1,
      name: 'Mac Miller',
      email: 'smallWorld@mc.com',
      password: 'Porcupine'
    };

    bcrypt.hash.mockResolvedValue('hashedPassword');
    database.user.create.mockResolvedValue(registeredUser);

    await request(app)
      .post('/register')
      .send({
        name: 'Mac Miller',
        email: 'smallWorld@mc.com',
        password: 'Porcupine',
        confirmPassword: 'Porcupine'
      });

    jest.clearAllMocks(); // Clear mocks 
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should register a new user and return 201 status', async () => {
      const mockUser = {
        id: 2,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      database.user.create.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toEqual(mockUser);
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(database.user.create).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashedPassword'
        }
      });
    });

    it('return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'Mac Miller',
          email: 'smallWorld@mc.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('All fields are required');
    });

    it('return 400 if passwords do not match', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'Mac Miller',
          email: 'smallWorld@mc.com',
          password: 'Porcupine',
          confirmPassword: 'DifferentPassword'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Passwords do not match');
    });

    it('should return 500 status on error', async () => {
      bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

      const response = await request(app)
        .post('/register')
        .send({
          name: 'Mac Miller',
          email: 'smallWorld@mc.com',
          password: 'Porcupine',
          confirmPassword: 'Porcupine'
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal server error');
    });
  });

  describe('POST /login', () => {
    it('login successfully and return user data', async () => {
      const mockUser = {
        id: 1,
        name: 'Mac Miller',
        email: 'smallWorld@mc.com'
      };

      passport.authenticate.mockImplementation((strategy, callback) => {
        return (req, res, next) => {
          callback(null, mockUser, { message: 'Login successful' });
        };
      });

      const response = await request(app)
        .post('/login')
        .send({
          email: 'smallWorld@mc.com',
          password: 'Porcupine'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.user).toEqual(mockUser);
    });

    it('return 400 if login fails', async () => {
      passport.authenticate.mockImplementation((strategy, callback) => {
        return (req, res, next) => {
          callback(null, false, { message: 'Invalid credentials' });
        };
      });

      const response = await request(app)
        .post('/login')
        .send({
          email: 'smallWorld@mc.com',
          password: 'WrongPassword'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('GET /logout', () => {
    it('logout successfully and return 200 status', async () => {
      const req = { logout: jest.fn((callback) => callback()) };

      app.get('/logout', (req, res) => {
        req.logout((err) => {
          if (err) {
            return res.status(500).json({ message: 'Internal server error' });
          }
          res.json({ message: 'Logout successful' });
        });
      });

      const response = await request(app).get('/logout');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logout successful');
    });

    it('return 500 if logout fails', async () => {
      const req = { logout: jest.fn((callback) => callback(new Error('Logout error'))) };

      app.get('/logout', (req, res) => {
        req.logout((err) => {
          if (err) {
            return res.status(500).json({ message: 'Internal server error' });
          }
          res.json({ message: 'Logout successful' });
        });
      });

      const response = await request(app).get('/logout');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal server error');
    });
  });

  describe('GET /status', () => {
    it('return authentication status as true with user data', async () => {
      const req = { isAuthenticated: jest.fn(() => true), user: { id: 1, name: 'Mac Miller', email: 'smallWorld@mc.com' } };

      app.get('/status', (req, res) => {
        if (req.isAuthenticated()) {
          return res.json({ isAuthenticated: true, user: req.user });
        }
        res.json({ isAuthenticated: false });
      });

      const response = await request(app).get('/status');

      expect(response.body.isAuthenticated).toBe(true);
      expect(response.body.user).toEqual({ id: 1, name: 'Mac Miller', email: 'smallWorld@mc.com' });
    });

    it('return authentication status as false', async () => {
      const req = { isAuthenticated: jest.fn(() => false) };

      app.get('/status', (req, res) => {
        if (req.isAuthenticated()) {
          return res.json({ isAuthenticated: true, user: req.user });
        }
        res.json({ isAuthenticated: false });
      });

      const response = await request(app).get('/status');

      expect(response.body.isAuthenticated).toBe(false);
    });
  });
});
