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

//mock prisma client to the app
app.prisma = mockPrisma;

//mock jwt.verify
jwt.verify = jest.fn();

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await app.prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  res.status(201).json({ user });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await app.prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
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
        confirmPassword: 'Porcupine',
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

describe('GET /logout', () => {
  it('should return 200 status', async () => {
    const response = await request(app).get('/logout');
    expect(response.status).toBe(200);
  });
});

describe('GET /status', () => {
  it('should return 200 status and user info if authenticated', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    jwt.verify.mockReturnValue({ id: mockUser.id });

    // Mock prisma.user.findUnique to return the mockUser
    app.prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);

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

describe('GET /profile', () => {
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

    const response = await request(app)
      .get('/appointments')
      .set('Authorization', 'Bearer mock_token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAppointments);
  });
});
