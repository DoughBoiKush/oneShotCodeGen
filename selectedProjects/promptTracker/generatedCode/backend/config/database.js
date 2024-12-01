const { Sequelize } = require('sequelize');
const path = require('path');
const dbPath = path.resolve(process.env.DB_PATH);
const sequelize = new Sequelize({dialect: 'sqlite',storage: dbPath,logging: false});
module.exports = sequelize;