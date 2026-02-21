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

const validProduct = {
  name: 'Test product',
  description: 'Test description',
  image: '',
  designer: 'Puig de Paní',
  category: 'Camisetas',
  size: 'M',
  price: 29.99
};

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

  test('GET /api/products/:id con producto existente devuelve 200', async () => {
    const fakeProduct = {
      _id: '507f1f77bcf86cd799439011',
      ...validProduct
    };
    Product.findById.mockResolvedValueOnce(fakeProduct);
    const res = await request(app).get('/api/products/507f1f77bcf86cd799439011');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test product');
  });

  test('POST /api/products crea producto y devuelve 201', async () => {
    const created = { _id: '507f1f77bcf86cd799439012', ...validProduct };
    Product.create.mockResolvedValueOnce(created);
    const res = await request(app).post('/api/products').send(validProduct);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(validProduct.name);
    expect(res.body.price).toBe(validProduct.price);
    expect(Product.create).toHaveBeenCalledWith(validProduct);
  });

  test('POST /api/products con body inválido devuelve 400', async () => {
    Product.create.mockRejectedValueOnce(new Error('Validation failed'));
    const res = await request(app).post('/api/products').send({ name: 'Solo nombre' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('PUT /api/products/:id actualiza y devuelve 200', async () => {
    const updated = { _id: '507f1f77bcf86cd799439011', ...validProduct, name: 'Updated name' };
    Product.findByIdAndUpdate.mockResolvedValueOnce(updated);
    const res = await request(app)
      .put('/api/products/507f1f77bcf86cd799439011')
      .send({ ...validProduct, name: 'Updated name' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated name');
  });

  test('PUT /api/products/:id con id inexistente devuelve 404', async () => {
    Product.findByIdAndUpdate.mockResolvedValueOnce(null);
    const res = await request(app)
      .put('/api/products/507f1f77bcf86cd799439011')
      .send(validProduct);
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  test('DELETE /api/products/:id elimina y devuelve 204', async () => {
    const deleted = { _id: '507f1f77bcf86cd799439011', ...validProduct };
    Product.findByIdAndDelete.mockResolvedValueOnce(deleted);
    const res = await request(app).delete('/api/products/507f1f77bcf86cd799439011');
    expect(res.status).toBe(204);
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
  });

  test('DELETE /api/products/:id con id inexistente devuelve 404', async () => {
    Product.findByIdAndDelete.mockResolvedValueOnce(null);
    const res = await request(app).delete('/api/products/507f1f77bcf86cd799439011');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});
