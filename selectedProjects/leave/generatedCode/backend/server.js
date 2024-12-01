require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const seed = require("./seeders");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/leaves", require("./routes/leaves"));
app.use("/api/users", require("./routes/users"));
sequelize.sync().then(async () => {
  const tables = await sequelize.showAllSchemas();

    await seed();
    console.log("Seeded");
  
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
