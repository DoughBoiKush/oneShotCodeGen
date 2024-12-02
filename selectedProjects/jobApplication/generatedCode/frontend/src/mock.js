import { axiosInstance } from './services/api';
import MockAdapter from 'axios-mock-adapter';

// Use the same axios instance
const mock = new MockAdapter(axiosInstance);

// Mock login endpoint
mock.onPost('/login').reply(200, {
  token: 'mock-token',
  user: { id: 1, name: 'Alice Johnson', role: 'admin' }
});

// Mock signup endpoint
mock.onPost('/signup').reply(201, {
  token: 'mock-token',
  user: { id: 2, name: 'Bob Smith', role: 'user' }
});

// Update other mock endpoints to use relative paths
mock.onGet('/applications').reply(200, [
  { id: 1, candidateName: 'Alice Johnson', position: 'Developer', status: 'new' },
  { id: 2, candidateName: 'Bob Smith', position: 'Designer', status: 'review' }
]);

mock.onPost('/applications').reply(201, {
  id: 3,
  candidateName: 'Charlie Brown',
  position: 'Manager',
  status: 'new'
});