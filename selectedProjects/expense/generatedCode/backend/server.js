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
    credentials: true, // Allows cookies or authorization headers
};

// Use CORS Middleware
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options("*", cors(corsOptions)); // Allow all OPTIONS requests
  
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
const PORT = 3000;
setupDatabase()
  .then(seedDatabase)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
