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
          email: 'admin@example.com',
          name: 'HR Admin',
          role: 'admin'
        }
      }
    ];
  }
  return [401, { message: 'Invalid credentials' }];
});

// Mock get employees
mock.onGet('/api/employees').reply(200, [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
    status: 'active',
    onboardingProgress: 75
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'Marketing',
    status: 'pending',
    onboardingProgress: 25
  }
]);

// Mock create employee
mock.onPost('/api/employees').reply((config) => {
  const employeeData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...employeeData,
      status: 'pending',
      onboardingProgress: 0
    }
  ];
});

// Mock get onboarding tasks
mock.onGet(/\/api\/employees\/\d+\/tasks/).reply(200, [
  {
    id: 1,
    title: 'Complete Personal Information',
    description: 'Fill out personal details form',
    status: 'completed',
    dueDate: '2024-03-20'
  },
  {
    id: 2,
    title: 'Review Company Policies',
    description: 'Read and acknowledge company policies',
    status: 'pending',
    dueDate: '2024-03-25'
  }
]);

// Mock update task status
mock.onPut(/\/api\/tasks\/\d+/).reply((config) => {
  const taskData = JSON.parse(config.data);
  return [200, { ...taskData }];
});

// Mock get departments
mock.onGet('/api/departments').reply(200, [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Marketing' },
  { id: 3, name: 'HR' },
  { id: 4, name: 'Finance' }
]);

export default mock;