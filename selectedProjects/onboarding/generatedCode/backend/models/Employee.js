const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Employee = sequelize.define("Employee", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM("pending", "active", "completed"),
    defaultValue: "pending",
  },
  startDate: { type: DataTypes.DATE },
});
module.exports = Employee;
