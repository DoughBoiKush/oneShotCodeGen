require("dotenv").config();
const express = require("express");
const cors = require("cors");
const setupDatabase = require("./config/db");
const seedDatabase = require("./config/seeder");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// CORS Configuration
const corsOptions = {
    origin: "https://expensefrontend-three.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

// CORS Middleware
app.use(cors(corsOptions));

// Handle OPTIONS Requests
app.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://expensefrontend-three.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(204).end();
});

// Body Parser
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);

// Database and Server Startup
const PORT = 3000;
setupDatabase()
  .then(seedDatabase)
  .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error starting server:", err));
