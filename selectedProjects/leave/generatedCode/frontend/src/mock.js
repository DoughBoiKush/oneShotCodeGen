import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from './services/api';

const mock = new MockAdapter(axiosInstance);

// Mock login
mock.onPost('/api/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  console.log(email, password);
  if (true) {
    return [
      200,
      {
        token: 'mock-token-123',
        user: {
          id: 1,
          email: 'user@example.com',
          name: 'Test User',
          role: 'admin'
        }
      }
    ];
  }
  return [401, { message: 'Invalid credentials' }];
});

// Mock get users
mock.onGet('/api/users').reply(200, [
  {
    id: 1,
    name: 'Test User',
    email: 'user@example.com',
    role: 'admin',
    LeaveBalance: { annual: 20, sick: 10, personal: 5 }
  },
  {
    id: 2,
    name: 'Employee',
    email: 'employee@example.com',
    role: 'employee',
    LeaveBalance: { annual: 15, sick: 10, personal: 5 }
  }
]);

// Mock create user
mock.onPost('/api/users').reply((config) => {
  const userData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...userData,
      LeaveBalance: { annual: 20, sick: 10, personal: 5 }
    }
  ];
});

// Mock get leave requests
mock.onGet('/api/leaves').reply(200, [
  {
    id: 1,
    type: 'annual',
    startDate: '2024-01-01',
    endDate: '2024-01-05',
    status: 'pending',
    reason: 'Vacation',
    UserId: 2
  },
  {
    id: 2,
    type: 'sick',
    startDate: '2024-02-01',
    endDate: '2024-02-02',
    status: 'approved',
    reason: 'Doctor appointment',
    UserId: 2
  }
]);

// Mock create leave request
mock.onPost('/api/leaves').reply((config) => {
  const leaveData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...leaveData,
      status: 'pending'
    }
  ];
});

// Mock update leave status
mock.onPut(/\/api\/leaves\/\d+\/status/).reply((config) => {
  const { status } = JSON.parse(config.data);
  return [200, { status }];
});

export default mock;