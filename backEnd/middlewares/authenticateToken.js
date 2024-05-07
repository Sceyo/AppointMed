const jwt = require("jsonwebtoken");

//example ni sir keenan sa authenticateToken 
const authenticateToken = async (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(403).json({ message: "Unauthorized access" });
  }

  jwt.verify(token, "12345678", async (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Unauthorized access" });
    }

    const userSession = await database.userSession.findFirst({
      where: {
        token: token,
      },
    });

    if (!userSession) {
      return response.status(403).json({ message: "Unauthorized access" });
    }

    request.user = user;
    next();
  });
};

module.exports = authenticateToken;
