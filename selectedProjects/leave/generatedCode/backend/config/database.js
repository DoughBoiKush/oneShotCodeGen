const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({dialect: 'sqlite',storage: process.env.DB_PATH,logging: false});
module.exports = sequelize;