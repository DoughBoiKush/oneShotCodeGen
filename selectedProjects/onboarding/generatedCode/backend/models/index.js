const sequelize = require("../config/database");
const User = require("./User");
const Employee = require("./Employee");
const Task = require("./Task");
const Document = require("./Document");
const Training = require("./Training");

// User-Employee Relationship
// Assuming each Employee has one User record associated with it
Employee.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasOne(Employee, { foreignKey: "userId", as: "employee" });

// Employee-Document Relationship
// One Employee can have many Documents
Employee.hasMany(Document, { foreignKey: "employeeId", as: "documents" });
Document.belongsTo(Employee, { foreignKey: "employeeId", as: "employee" });

// Employee-Training Relationship
// Each Training is associated with one Employee
Training.belongsTo(Employee, { foreignKey: "employeeId", as: "employee" });
Employee.hasMany(Training, { foreignKey: "employeeId", as: "trainings" });

// Employee-Task Many-to-Many Relationship
// Employees and Tasks are associated through a join table "EmployeeTasks"
Task.belongsToMany(Employee, { through: "EmployeeTasks", as: "employees" });
Employee.belongsToMany(Task, { through: "EmployeeTasks", as: "tasks" });

module.exports = { sequelize, User, Employee, Task, Document, Training };
