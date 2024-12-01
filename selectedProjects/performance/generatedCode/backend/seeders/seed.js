const bcrypt = require('bcryptjs');
const { User, Review, ReviewCycle, sequelize } = require('../models');
const seed = async () => {try {await sequelize.sync({ force: true });
const admin = await User.create({email: 'user@example.com',password: bcrypt.hashSync('test123', 8),name: 'Admin User',role: 'admin'});
const cycle = await ReviewCycle.create({name: 'Q1 2024',startDate: new Date(),endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),status: 'active'});
console.log('Database seeded!');} catch (error) {console.error('Seeding error:', error);}};
module.exports = seed;