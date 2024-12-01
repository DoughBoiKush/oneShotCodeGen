const bcrypt = require('bcryptjs');
const { User, Application } = require('../models');
const seedDatabase = async () => {
try {
const adminUser = await User.create({
email: 'user@example.com',
password: bcrypt.hashSync('test123', 10),
role: 'admin',
name: 'Admin User'
});
await Application.bulkCreate([
{ candidateName: 'John Doe', position: 'Software Engineer', status: 'review', createdById: adminUser.id },
{ candidateName: 'Jane Smith', position: 'Product Manager', status: 'interview', createdById: adminUser.id }
]);
console.log('Database seeded successfully');
} catch (error) {
console.error('Error seeding database:', error);
}
};
module.exports = seedDatabase;