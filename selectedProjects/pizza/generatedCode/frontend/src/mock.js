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
          name: 'Pizza Customer',
          role: 'customer'
        }
      }
    ];
  }
  return [401, { message: 'Invalid credentials' }];
});

// Mock get pizzas
mock.onGet('/api/pizzas').reply(200, [
  {
    id: 1,
    name: 'Margherita',
    description: 'Classic tomato and mozzarella',
    price: 12.99,
    category: 'pizza',
    image: 'margherita.jpg',
    toppings: ['tomato sauce', 'mozzarella', 'basil']
  },
  {
    id: 2,
    name: 'Pepperoni',
    description: 'Spicy pepperoni with cheese',
    price: 14.99,
    category: 'pizza',
    image: 'pepperoni.jpg',
    toppings: ['tomato sauce', 'mozzarella', 'pepperoni']
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
//mock get places
mock.onGet("/api/places").reply(200, [
  { id: 1, name: "Pizza Place 1", averageRating: 4.5, address: "123 Main St" },
  { id: 2, name: "Pizza Place 2", averageRating: 4.2, address: "456 Elm St" },
]);
//mock get reviews
mock.onGet("/api/reviews").reply(200, [
  { id: 1, placeId: 1, createdAt: "2024-01-01",  rating: 4.5, comment: "Great pizza!", user: { id: 1, name: "John Doe" }, pizzaPlace: { id: 1, name: "Pizza Place 1" } },
  { id: 2, placeId: 2, createdAt: "2024-01-01", rating: 4.2, comment: "Good pizza, but the crust could be better.", user: { id: 2, name: "Jane Smith" }, pizzaPlace: { id: 2, name: "Pizza Place 2" } }
]);
// Mock get orders
mock.onGet("/api/orders").reply(200, [
  {
    id: 1,
    items: [
      { pizzaId: 1, quantity: 2, price: 12.99 },
      { pizzaId: 2, quantity: 1, price: 14.99 }
    ],
    total: 40.97,
    status: 'delivered',
    createdAt: '2024-03-15T10:30:00Z',
    deliveryAddress: '123 Main St'
  }
]);

// Mock update order status
mock.onPut(/\/api\/orders\/\d+\/status/).reply((config) => {
  const { status } = JSON.parse(config.data);
  return [200, { status }];
});

// Mock get categories
mock.onGet('/api/categories').reply(200, [
  { id: 1, name: 'pizza', displayName: 'Pizzas' },
  { id: 2, name: 'sides', displayName: 'Side Dishes' },
  { id: 3, name: 'drinks', displayName: 'Beverages' }
]);

// Mock get toppings
mock.onGet('/api/toppings').reply(200, [
  { id: 1, name: 'pepperoni', price: 1.50 },
  { id: 2, name: 'mushrooms', price: 1.00 },
  { id: 3, name: 'extra cheese', price: 2.00 },
  { id: 4, name: 'olives', price: 1.00 }
]);
//mock get stats
mock.onGet("/api/consumption/stats").reply(200, [
  { date: "2024-01-01", slices: 100 },
  { date: "2024-01-02", slices: 150 },
]);
export default mock;