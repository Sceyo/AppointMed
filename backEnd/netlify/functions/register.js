const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.handler = async (event) => {
  const { name, email, password, confirmPassword } = JSON.parse(event.body);

  if (!name || !email || !password || !confirmPassword || name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'All fields are required' }),
    };
  }

  if (password !== confirmPassword) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Passwords do not match' }),
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered successfully', user: newUser }),
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};