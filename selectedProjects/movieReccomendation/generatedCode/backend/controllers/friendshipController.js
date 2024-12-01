const { User, Friendship } = require('../models');
const sendRequest = async (req, res) => {
try {
await Friendship.create({ userId: req.user.id, friendId: req.params.friendId });
res.status(201).json({ message: 'Friend request sent' });
} catch (error) {
res.status(400).json({ error: error.message });
}
};
const acceptRequest = async (req, res) => {
try {
const friendship = await Friendship.findOne({where: {userId: req.params.userId,friendId: req.user.id,status: 'pending'}});
if (!friendship) return res.status(404).json({ error: 'Request not found' });
await friendship.update({ status: 'accepted' });
res.json({ message: 'Friend request accepted' });
} catch (error) {
res.status(500).json({ error: error.message });
}
};
const getFriends = async (req, res) => {
try {
const user = await User.findByPk(req.user.id, {include: [{model: User,as: 'friends',through: { where: { status: 'accepted' } }}]});
res.json(user.friends);
} catch (error) {
res.status(500).json({ error: error.message });
}
};
module.exports = { sendRequest, acceptRequest, getFriends };