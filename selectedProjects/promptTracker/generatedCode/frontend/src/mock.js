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
          name: 'Prompt Engineer',
          role: 'admin'
        }
      }
    ];
  }
  return [401, { message: 'Invalid credentials' }];
});
//mock get chains
mock.onGet('/api/chains').reply(200, [
  {
    id: 1,
    name: 'Code Review Assistant',
    description: 'This is a code review assistant...',
  }
]);
// Mock get prompts
mock.onGet('/api/prompts').reply(200, [
  {
    id: 1,
    title: 'Code Review Assistant',
    content: 'You are an AI code reviewer...',
    category: 'development',
    tags: ['code-review', 'programming'],
    createdAt: '2024-03-15T10:30:00Z',
    userId: 1,
    rating: 4.5,
    usageCount: 150
  },
  {
    id: 2,
    title: 'Blog Post Writer',
    content: 'You are a professional blog writer...',
    category: 'writing',
    tags: ['blog', 'content'],
    createdAt: '2024-03-14T15:45:00Z',
    userId: 1,
    rating: 4.2,
    usageCount: 89
  }
]);

// Mock create prompt
mock.onPost('/api/prompts').reply((config) => {
  const promptData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...promptData,
      createdAt: new Date().toISOString(),
      rating: 0,
      usageCount: 0
    }
  ];
});

// Mock update prompt
mock.onPut(/\/api\/prompts\/\d+/).reply((config) => {
  const promptData = JSON.parse(config.data);
  return [200, { ...promptData }];
});

// Mock get categories
mock.onGet('/api/categories').reply(200, [
  { id: 1, name: 'development', displayName: 'Development' },
  { id: 2, name: 'writing', displayName: 'Writing' },
  { id: 3, name: 'analysis', displayName: 'Analysis' },
  { id: 4, name: 'other', displayName: 'Other' }
]);

// Mock get usage history
mock.onGet('/api/usage-history').reply(200, [
  {
    id: 1,
    promptId: 1,
    userId: 1,
    timestamp: '2024-03-15T10:30:00Z',
    success: true,
    feedback: 'Excellent suggestions'
  },
  {
    id: 2,
    promptId: 2,
    userId: 1,
    timestamp: '2024-03-14T15:45:00Z',
    success: true,
    feedback: 'Good but could be more detailed'
  }
]);

// Mock create usage record
mock.onPost('/api/usage-history').reply((config) => {
  const usageData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...usageData,
      timestamp: new Date().toISOString()
    }
  ];
});
// Mock get users
mock.onGet('/api/users').reply(200, [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
]);
export default mock;