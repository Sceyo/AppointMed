const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateJWT } = require('../middlewares/authenticateJWT'); // Ensure your middleware is compatible

exports.handler = async (event, context) => {
  try {
    const user = authenticateJWT(event.headers); // Adjust this according to your actual middleware

    if (!user) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isAuthenticated: false, user: null }),
      };
    }

    console.log('User ID from token:', user.id); // Log the user ID

    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true, name: true },
    });

    if (!foundUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ isAuthenticated: true, user: foundUser }),
    };
  } catch (error) {
    console.error('Error fetching user status:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' }),
    };
  }
};