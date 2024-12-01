require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const seedDatabase = require('./seeders');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));
sequelize.sync({ force: true }).then(() => {
seedDatabase();
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});