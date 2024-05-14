const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const routes = require("./routes");
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/auth", routes.authRoute);
app.use("/user", routes.userRoute);
app.use("/user", routes.apptRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
