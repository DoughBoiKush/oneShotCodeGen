require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const seed = require('./seeders/seed');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/friendships', require('./routes/friendships'));
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: true }).then(async () => {
await seed();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});