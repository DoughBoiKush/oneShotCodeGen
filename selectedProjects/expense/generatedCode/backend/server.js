require("dotenv").config();
const express = require("express");
const cors = require("cors");
const setupDatabase = require("./config/db");
const seedDatabase = require("./config/seeder");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const app = express();

app.use(cors({ origin: "https://expensefrontend-three.vercel.app/" }));

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
const PORT = 3000;
setupDatabase()
  .then(seedDatabase)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
