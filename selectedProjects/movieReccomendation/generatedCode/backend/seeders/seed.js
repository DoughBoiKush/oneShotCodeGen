const bcrypt = require('bcryptjs');
const { User, Recommendation, Rating, Friendship } = require('../models');
const seed = async () => {
try {
const admin = await User.create({email: 'user@example.com',password: bcrypt.hashSync('test123', 8),name: 'Admin User',isAdmin: true});
const user1 = await User.create({email: 'user1@example.com',password: bcrypt.hashSync('password123', 8),name: 'User One'});
const user2 = await User.create({email: 'user2@example.com',password: bcrypt.hashSync('password123', 8),name: 'User Two'});
const rec1 = await Recommendation.create({title: 'Inception',type: 'movie',description: 'Mind-bending thriller',UserId: user1.id});
const rec2 = await Recommendation.create({title: 'Breaking Bad',type: 'show',description: 'Crime drama series',UserId: user2.id});
await Rating.create({rating: 5,review: 'Masterpiece!',UserId: user2.id,RecommendationId: rec1.id});
await Rating.create({rating: 4,review: 'Great show!',UserId: user1.id,RecommendationId: rec2.id});
await Friendship.create({userId: user1.id,friendId: user2.id,status: 'accepted'});
console.log('Seed completed');
} catch (error) {
console.error('Seeding error:', error);
}
};
module.exports = seed;