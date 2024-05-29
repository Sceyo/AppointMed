const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Log the Authorization header

  if (!authHeader) {
    console.error('Access denied. No token provided.');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log('Token:', token); // Log the token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log the decoded token
    req.user = decoded;
    next();
  } catch (ex) {
    console.error('Invalid token:', ex);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateJWT;
