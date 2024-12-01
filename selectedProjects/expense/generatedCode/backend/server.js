require("dotenv").config();
const express = require("express");
const cors = require("cors");
const setupDatabase = require("./config/db");
const seedDatabase = require("./config/seeder");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const app = express();

const corsOptions = {
    origin: "https://expensefrontend-three.vercel.app", // Your Vercel frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Include required headers
    credentials: true, // Allow cookies or authorization headers
  };
  
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests


app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
const PORT = 3000;
setupDatabase()
  .then(seedDatabase)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
