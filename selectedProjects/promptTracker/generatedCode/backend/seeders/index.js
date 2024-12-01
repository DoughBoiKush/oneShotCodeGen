const bcrypt = require("bcryptjs");
const { User, Prompt, Chain, Rating } = require("../models");
const seed = async () => {
  try {
    const adminUser = await User.create({
      email: "user@example.com",
      password: bcrypt.hashSync("test123", 10),
      role: "admin",
    });
    const prompt = await Prompt.create({
      title: "Test Prompt",
      content: "This is a test prompt",
      UserId: adminUser.id,
    });
    const chain = await Chain.create({
      name: "Test Chain",
      description: "Test chain description",
      UserId: adminUser.id,
    });
    await Rating.create({
      score: 5,
      parameter: "quality",
      UserId: adminUser.id,
      PromptId: prompt.id,
    });
    await chain.addPrompt(prompt);
  } catch (error) {
    console.error("Seeding error:", error);
  }
};
module.exports = seed;
