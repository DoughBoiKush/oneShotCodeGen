const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { login, register };
