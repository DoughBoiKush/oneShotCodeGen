const { Employee, User, Task, Document, Training } = require("../models");
const bcrypt = require("bcryptjs");
const createEmployee = async (req, res) => {
  try {
    const { email, password, firstName, lastName, startDate } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "employee",
    });
    const employee = await Employee.create({
      userId: user.id,
      firstName,
      lastName,
      startDate,
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.findAll({
        include: [
          {
            model: User,
            as: "user", // Specify the alias
          },
        ],
      });
      res.json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ error: "Error fetching employees" });
    }
  };
  
module.exports = { createEmployee, getEmployees };
