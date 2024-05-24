const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors'); 
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/auth", routes.authRoute);
app.use("/user", routes.userRoute);
app.use("/appt", routes.apptRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
