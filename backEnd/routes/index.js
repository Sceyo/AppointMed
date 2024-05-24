const userRoute = require("./userRoutes");
const authRoute = require("./authRoutes");
const apptRoute = require("./apptRoutes");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = {
  userRoute,
  authRoute,
  apptRoute


};
