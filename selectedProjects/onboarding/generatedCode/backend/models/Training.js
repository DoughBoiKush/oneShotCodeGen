const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Training = sequelize.define("Training", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM("not_started", "in_progress", "completed"),
    defaultValue: "not_started",
  },
  completionDate: { type: DataTypes.DATE },
});
module.exports = Training;
