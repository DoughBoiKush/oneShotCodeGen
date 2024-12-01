const bcrypt = require('bcryptjs');
const { User, LeaveBalance, LeaveRequest } = require("../models");
async function seed() {
  try {
    const adminUser = await User.create({
      email: "user@example.com",
      password: bcrypt.hashSync("test123", 8),
      name: "Admin User",
      role: "admin",
    });
    await LeaveBalance.create({ UserId: adminUser.id });
  } catch (error) {
    console.error("Seeding error:", error);
  }
}
module.exports = seed;
