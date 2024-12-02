import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from './services/api';

const mock = new MockAdapter(axiosInstance);

// Mock login
mock.onPost('/api/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  if (true) {
    return [
      200,
      {
        token: 'mock-token-123',
        user: {
          id: 1,
          email: 'user@example.com',
          name: 'Movie Lover',
          isAdmin: true
        }
      }
    ];
  }
  return [401, { message: 'Invalid credentials' }];
});

// Mock register
mock.onPost('/api/auth/register').reply((config) => {
  const userData = JSON.parse(config.data);
  return [
    201,
    {
      token: 'mock-token-new',
      user: {
        id: Math.floor(Math.random() * 1000),
        ...userData,
        isAdmin: false
      }
    }
  ];
});

// Mock get recommendations
mock.onGet('/api/recommendations').reply(200, [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years',
    genre: 'Drama',
    rating: 9.3,
    recommendedBy: 1
  },
  {
    id: 2,
    title: 'Inception',
    description: 'A thief who steals corporate secrets',
    genre: 'Sci-Fi',
    rating: 8.8,
    recommendedBy: 2
  }
]);

// Mock create recommendation
mock.onPost('/api/recommendations').reply((config) => {
  const recommendationData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...recommendationData,
      createdAt: new Date().toISOString()
    }
  ];
});

// Mock get friends
mock.onGet('/api/friendships/friends').reply(200, [
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    status: 'accepted'
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'john@example.com',
    status: 'accepted'
  }
]);

// Mock friend request endpoints
mock.onPost(/\/api\/friendships\/request\/\d+/).reply(201, {
  message: 'Friend request sent successfully'
});

mock.onPut(/\/api\/friendships\/accept\/\d+/).reply(200, {
  message: 'Friend request accepted'
});

export default mock;