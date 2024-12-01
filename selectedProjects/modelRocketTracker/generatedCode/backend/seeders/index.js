const bcrypt = require('bcryptjs');
const { User, Project, Task } = require('../models');
const seed = async () => {
try {
const adminUser = await User.create({
email: 'user@example.com',
password: bcrypt.hashSync('test123', 8),
name: 'Admin User',
role: 'admin'
});
const project = await Project.create({
title: 'Sample Rocket Project',
description: 'A test rocket building project',
UserId: adminUser.id
});
await Task.create({
title: 'Design Phase',
description: 'Initial rocket design',
ProjectId: project.id
});
} catch (error) {console.error('Seeding error:', error);}
};
module.exports = seed;