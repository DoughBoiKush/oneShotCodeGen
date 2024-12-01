require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const seed = require('./seeders');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
sequelize.sync().then(async () => {
const count = await sequelize.models.User.count();
if (count === 0) await seed();
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});