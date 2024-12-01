const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Document = sequelize.define("Document", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM("pending", "submitted", "approved"),
    defaultValue: "pending",
  },
  fileUrl: { type: DataTypes.STRING },
});
module.exports = Document;
