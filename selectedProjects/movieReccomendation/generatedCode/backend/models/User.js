const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define('User', {
id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
email: {type: DataTypes.STRING,unique: true,allowNull: false},
password: {type: DataTypes.STRING,allowNull: false},
name: {type: DataTypes.STRING,allowNull: false},
isAdmin: {type: DataTypes.BOOLEAN,defaultValue: false}
});
module.exports = User;