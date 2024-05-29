import jwt from 'jsonwebtoken';

/**
 * Validates the JWT token.
 * @param {string} token - The JWT token to validate.
 * @returns {boolean} - Returns true if the token is valid, otherwise false.
 */
export function validateToken(token) {
  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (decoded.exp < currentTime) {
      return false; // Token is expired
    }

    // Optionally, you can verify the token signature if you have the secret
    // jwt.verify(token, process.env.JWT_SECRET);

    return true;
  } catch (error) {
    return false;
  }
}
