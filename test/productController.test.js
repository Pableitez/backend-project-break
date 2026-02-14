const request = require('supertest');

jest.mock('../models/Product');

const Product = require('../models/Product');
Product.designerEnum = ['Puig de Paní', 'Serra de Rodes'];
Product.categoryEnum = ['Camisetas', 'Pantalones'];
Product.sizeEnum = ['XS', 'S', 'M', 'L', 'XL'];
Product.find = jest.fn().mockReturnValue({ sort: jest.fn().mockResolvedValue([]) });
Product.findById = jest.fn().mockResolvedValue(null);
Product.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);
Product.create = jest.fn();

const app = require('../app');

describe('API Productos', () => {
  test('GET /api/products devuelve 200 y array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/products/:id con id inexistente devuelve 404', async () => {
    Product.findById.mockResolvedValueOnce(null);
    const res = await request(app).get('/api/products/507f1f77bcf86cd799439011');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  test('GET /api/products/:id con producto existe devuelve 200', async () => {
    const fakeProduct = {
      _id: '507f1f77bcf86cd799439011',
      name: 'Test',
      description: 'Desc',
      image: '',
      designer: 'Puig de Paní',
      category: 'Camisetas',
      size: 'M',
      price: 100
    };
    Product.findById.mockResolvedValueOnce(fakeProduct);
    const res = await request(app).get('/api/products/507f1f77bcf86cd799439011');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test');
  });
});
