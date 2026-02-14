module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API Tienda de ropa Creus',
    version: '1.0.0',
    description: 'API REST de productos para uso con frontend (ej. React). Mismas operaciones que el dashboard en formato JSON.'
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
  paths: {
    '/api/products': {
      get: {
        summary: 'Lista todos los productos',
        parameters: [
          { name: 'designer', in: 'query', description: 'Filtrar por colección' },
          { name: 'category', in: 'query', description: 'Filtrar por categoría' },
          { name: 'search', in: 'query', description: 'Buscar en nombre o descripción' },
          { name: 'sort', in: 'query', description: 'Ordenar: price_asc, price_desc, name_asc, name_desc' }
        ],
        responses: { 200: { description: 'Array de productos' } }
      },
      post: {
        summary: 'Crea un producto',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'description', 'designer', 'category', 'size', 'price'],
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  image: { type: 'string' },
                  designer: { type: 'string' },
                  category: { type: 'string' },
                  size: { type: 'string' },
                  price: { type: 'number' }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'Producto creado' }, 400: { description: 'Error de validación' } }
      }
    },
    '/api/products/{id}': {
      get: {
        summary: 'Obtiene un producto por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Producto' }, 404: { description: 'No encontrado' } }
      },
      put: {
        summary: 'Actualiza un producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  image: { type: 'string' },
                  designer: { type: 'string' },
                  category: { type: 'string' },
                  size: { type: 'string' },
                  price: { type: 'number' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Producto actualizado' }, 404: { description: 'No encontrado' } }
      },
      delete: {
        summary: 'Elimina un producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'Eliminado' }, 404: { description: 'No encontrado' } }
      }
    }
  }
};
