const jwt = require('jsonwebtoken');
const { User } = require('../models');
exports.authenticate = async (req, res, next) => {
try {
const token = req.headers.authorization?.split(' ')[1];
if (!token) return res.status(401).json({ message: 'No token provided' });
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findByPk(decoded.id);
if (!req.user) return res.status(401).json({ message: 'User not found' });
next();
} catch (error) {
res.status(401).json({ message: 'Invalid token' });
}
};
exports.isAdmin = (req, res, next) => {
if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
next();
};