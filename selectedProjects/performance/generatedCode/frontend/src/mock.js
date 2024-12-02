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
          email: 'manager@example.com',
          name: 'Performance Manager',
          role: 'manager'
        }
      }
    ];
  }
  return [401, { message: 'Invalid credentials' }];
});

// Mock get performance reviews
mock.onGet('/api/reviews').reply(200, [
  {
    id: 1,
    employeeId: 2,
    reviewerId: 1,
    type: "performance",
    period: '2024-Q1',
    status: 'completed',
    rating: 4,
    feedback: 'Excellent team player with strong technical skills',
    createdAt: '2024-01-01',
    goals: [
      { id: 1, description: 'Complete advanced certification', status: 'in_progress' },
      { id: 2, description: 'Mentor junior team members', status: 'completed' }
    ]
  },
  {
    id: 2,
    employeeId: 3,
    reviewerId: 1,
    type: "performance",
    period: '2024-Q1',
    status: 'pending',
    rating: null,
    feedback: "",
    createdAt: "2024-01-01",
    goals: [
      { id: 3, description: "Improve project documentation", status: "pending" }
    ]
  }
]);

// Mock create review
mock.onPost('/api/reviews').reply((config) => {
  const reviewData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...reviewData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ];
});

// Mock update review
mock.onPut(/\/api\/reviews\/\d+/).reply((config) => {
  const reviewData = JSON.parse(config.data);
  return [200, { ...reviewData }];
});

// Mock get goals
mock.onGet(/\/api\/employees\/\d+\/goals/).reply(200, [
  {
    id: 1,
    description: 'Complete advanced certification',
    status: 'in_progress',
    dueDate: '2024-06-30'
  },
  {
    id: 2,
    description: 'Mentor junior team members',
    status: 'completed',
    dueDate: '2024-03-31'
  }
]);

// Mock create goal
mock.onPost('/api/goals').reply((config) => {
  const goalData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...goalData,
      status: 'pending'
    }
  ];
});

// Mock get employees
mock.onGet('/api/employees').reply(200, [
  {
    id: 2,
    name: 'John Developer',
    email: 'john@example.com',
    department: 'Engineering',
    position: 'Senior Developer'
  },
  {
    id: 3,
    name: 'Sarah Designer',
    email: 'sarah@example.com',
    department: 'Design',
    position: 'UI/UX Designer'
  }
]);

export default mock;