const { User, LeaveBalance } = require("../models");
const bcrypt = require("bcryptjs");
exports.createUser = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = await User.create({ ...req.body, password: hashedPassword });
    await LeaveBalance.create({ UserId: user.id });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [LeaveBalance] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
