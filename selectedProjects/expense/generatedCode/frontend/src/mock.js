import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock login endpoint
mock.onPost('http://localhost:3000/api/login').reply(200, {
  token: 'mock-token',
  user: { id: 1, name: 'John Doe', role: 'admin' }
});

// Mock signup endpoint
mock.onPost('http://localhost:3000/api/signup').reply(201, {
  token: 'mock-token',
  user: { id: 1, name: 'John Doe', role: 'user' }
});

// Mock get all users endpoint
mock.onGet('http://localhost:3000/api/users').reply(200, [
  { id: 1, name: 'John Doe', role: 'user', status: true },
  { id: 2, name: 'Jane Smith', role: 'admin', status: true }
]);

// Mock get expenses endpoint
mock.onGet('http://localhost:3000/api/expenses').reply(200, [
  { id: 1, date: '2023-10-01', amount: 100, status: 'Approved' },
  { id: 2, date: '2023-10-02', amount: 200, status: 'Pending' },
  { id: 3, date: '2023-10-03', amount: 300, status: 'Rejected' }
]);

// Mock submit expense endpoint
mock.onPost('http://localhost:3000/api/expenses').reply(201, {
  id: 4,
  date: '2023-10-04',
  amount: 400,
  status: 'Pending'
});