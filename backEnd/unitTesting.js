
const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const { database } = require("./prisma/database");
const router = require("./routes"); 

const app = express();
app.use(express.json()); 
app.use(router);

jest.mock('bcrypt');
jest.mock("./prisma/database");

describe('POST /user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user and return 201 status', async () => {
    const mockUser = {
      id: 1,
      name: 'Mac Miller',
      email: 'smallWorld@mc.com',
      password: 'Porcupine',
      confirmPassword: 'Porcupine'
    };

    bcrypt.hash.mockResolvedValue('Porcupine');
    database.user.create.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/user')
      .send({
        name: 'Mac Miller',
        email: 'smallWorld@mc.com',
        password: 'Porcupine',
        confirmPassword: 'Porcupine'
        });

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(database.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Mac Miller',
        email: 'smallWorld@mc.com',
        password: 'Porcupine',
        confirmPassword: 'Porcupine'
        }
    });
  });

  it('should return 500 status on error', async () => {
    bcrypt.hash.mockRejectedValue(new Error('Hashing error'));
    
    const response = await request(app)
      .post('/user')
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
