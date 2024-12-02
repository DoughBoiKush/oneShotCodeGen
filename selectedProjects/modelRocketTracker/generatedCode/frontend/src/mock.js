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
          name: 'Admin User',
          role: 'admin'
        }
      }
    ];
  }
  return [401, { message: 'Invalid credentials' }];
});

// Mock get projects
mock.onGet('/api/projects').reply(200, [
  {
    id: 1,
    title: 'Sample Rocket Project',
    description: 'A test rocket building project',
    status: 'in_progress',
    UserId: 1,
    Tasks: [
      {
        id: 1,
        title: 'Design Phase',
        description: 'Initial rocket design',
        status: 'completed'
      }
    ]
  }
]);

// Mock create project
mock.onPost('/api/projects').reply((config) => {
  const projectData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...projectData,
      status: 'in_progress'
    }
  ];
});

// Mock get tasks
mock.onGet(/\/api\/projects\/\d+\/tasks/).reply(200, [
  {
    id: 1,
    title: 'Design Phase',
    description: 'Initial rocket design',
    status: 'completed',
    ProjectId: 1
  },
  {
    id: 2,
    title: 'Construction',
    description: 'Building the rocket components',
    status: 'in_progress',
    ProjectId: 1
  }
]);

// Mock create task
mock.onPost(/\/api\/projects\/\d+\/tasks/).reply((config) => {
  const taskData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...taskData,
      status: 'pending'
    }
  ];
});

// Mock update task
mock.onPut(/\/api\/tasks\/\d+/).reply((config) => {
  const taskData = JSON.parse(config.data);
  return [200, { ...taskData }];
});

export default mock;