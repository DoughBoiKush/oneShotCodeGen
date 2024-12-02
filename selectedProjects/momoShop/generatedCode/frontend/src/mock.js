import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from './services/api';

const mock = new MockAdapter(axiosInstance);

// Mock login
mock.onPost('/api/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);
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

// Mock get products
mock.onGet('/api/products').reply(200, [
  {
    id: 1,
    name: 'Momo Special',
    description: 'Signature steamed dumplings',
    price: 8.99,
    category: 'momo',
    image: 'momo-special.jpg'
  },
  {
    id: 2,
    name: 'Chicken Momo',
    description: 'Classic chicken dumplings',
    price: 7.99,
    category: 'momo',
    image: 'chicken-momo.jpg'
  }
]);

// Mock create order
mock.onPost('/api/orders').reply((config) => {
  const orderData = JSON.parse(config.data);
  return [
    201,
    {
      id: Math.floor(Math.random() * 1000),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ];
});

// Mock get orders
mock.onGet('/api/orders').reply(200, [
  {
    id: 1,
    items: [
      { productId: 1, quantity: 2, price: 8.99 },
      { productId: 2, quantity: 1, price: 7.99 }
    ],
    total: 25.97,
    status: 'completed',
    createdAt: '2024-03-15T10:30:00Z'
  }
]);

// Mock update order status
mock.onPut(/\/api\/orders\/\d+\/status/).reply((config) => {
  const { status } = JSON.parse(config.data);
  return [200, { status }];
});

// Mock get categories
mock.onGet('/api/categories').reply(200, [
  { id: 1, name: 'momo', displayName: 'Momos' },
  { id: 2, name: 'sides', displayName: 'Side Dishes' },
  { id: 3, name: 'drinks', displayName: 'Beverages' }
]);

export default mock;