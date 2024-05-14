
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const database = require("../prisma/database");
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/register", async (request, response) => {
  const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);

  const newUser = {
    name: request.body.name,
    email: request.body.email,
    password: hashedPassword,
    confirmPassword: hashedPassword
  };

  await database.user.create({
    data: newUser,
  });

  response.status(201).json({
    message: "Account registration successful.",
  });
});

module.exports = router;