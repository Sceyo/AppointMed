const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(express.json());

// Mock PrismaClient
const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  appointment: {
    count: jest.fn(),
    findMany: jest.fn(),
  },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};

// Mock prisma client to the app
app.prisma = mockPrisma;

// Mock jwt.verify and jwt.sign
jwt.verify = jest.fn();
jwt.sign = jest.fn(() => 'mock_token');
process.env.JWT_SECRET = 'test_secret';  // Set this in a global setup file or directly in your tests


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await app.prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  res.status(201).json({ user });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await app.prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
  jwt.sign = jest.fn(() => 'mock_token');
  console.log('Generated Token:', token);  // Debug output
  res.status(200).json({ token, user: { name: user.name } });
});

app.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

app.get('/status', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = app.prisma.user.findUnique({ where: { id: decoded.id } });
    res.status(200).json({ isAuthenticated: true, user });
  } catch (error) {
    res.status(200).json({ isAuthenticated: false, user: null });
  }
});

app.get('/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await app.prisma.user.findUnique({ where: { id: decoded.id } });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/dashboard', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET);
  const appointmentsCount = await app.prisma.appointment.count();
  res.status(200).json({ appointmentsCount });
});

app.get('/appointments', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET);
  const appointments = await app.prisma.appointment.findMany();
  res.status(200).json(appointments);
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('POST /register', () => {
  it('should create a new user and return 201 status', async () => {
    const mockUser = {
      id: 1,
      name: 'Mac Miller',
      email: 'smallWorld@mc.com',
    };

    bcrypt.hash = jest.fn().mockResolvedValue('hashed_password');
    app.prisma.user.create.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/register')
      .send({
        name: 'Mac Miller',
        email: 'smallWorld@mc.com',
        password: 'Porcupine',
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toEqual(mockUser);
    expect(app.prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Mac Miller',
        email: 'smallWorld@mc.com',
        password: 'hashed_password',
      },
    });
  });

  it('should return 400 status if fields are missing', async () => {
    const response = await request(app)
      .post('/register')
      .send({});
  
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required');
  });
});

describe('POST /login', () => {
  it('should return JWT token on successful login', async () => {
    const mockUser = {
      id: 1,
      name: 'Mac Miller',
      email: 'smallWorld@mc.com',
      password: 'hashed_password',
    };

    app.prisma.user.findUnique.mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    const response = await request(app)
      .post('/login')
      .send({
        email: 'smallWorld@mc.com',
        password: 'Porcupine',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, email: 'smallWorld@mc.com', name: 'Mac Miller' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  it('should return 401 status if user not found', async () => {
    app.prisma.user.findUnique.mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@user.com',
        password: 'password',
      });

    expect(response.status).toBe(401);
  });
});

describe('GET /status', () => {
  it('should return 200 status and user info if authenticated', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    jwt.verify.mockReturnValue({ id: mockUser.id });

    app.prisma.user.findUnique.mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/status')
      .set('Authorization', 'Bearer mock_token');

    expect(response.status).toBe(200);
    expect(response.body.isAuthenticated).toBe(true);
    expect(response.body.user).toEqual(mockUser);
  });

  it('should return 200 status and isAuthenticated=false if not authenticated', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Token expired');
    });

    const response = await request(app).get('/status');

    expect(response.status).toBe(200);
    expect(response.body.isAuthenticated).toBe(false);
    expect(response.body.user).toBeNull();
  });
});

describe('GET /logout', () => {
  it('should return 200 status', async () => {
    const response = await request(app).get('/logout');
    expect(response.status).toBe(200);
  });
});

describe('GET /profile', () => {
  jest.setTimeout(30000); // Increase timeout to 30 seconds

  it('should return 200 status and user profile data', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    app.prisma.user.findUnique.mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/profile')
      .set('Authorization', 'Bearer mock_token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should return 404 status if user not found', async () => {
    app.prisma.user.findUnique.mockResolvedValue(null);

    const response = await request(app)
      .get('/profile')
      .set('Authorization', 'Bearer mock_token');

    expect(response.status).toBe(404);
  });
});

describe('GET /dashboard', () => {
  jest.setTimeout(30000); // Increase timeout to 30 seconds

  it('should return 200 status and appointments count', async () => {
    app.prisma.appointment.count.mockResolvedValue(5);

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer mock_token');

    expect(response.status).toBe(200);
    expect(response.body.appointmentsCount).toBe(5);
  });
});

describe('GET /appointments', () => {
  it('should return 200 status and user appointments', async () => {
    const mockAppointments = [{ id: 1, reason: 'Check-up' }, { id: 2, reason: 'Follow-up' }];
    app.prisma.appointment.findMany.mockResolvedValue(mockAppointments);

    jwt.verify.mockReturnValue({ id: 1 });

    const response = await request(app)
      .get('/appointments')
      .set('Authorization', 'Bearer mock_token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAppointments);
  });
});
