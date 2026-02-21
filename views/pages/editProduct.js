const layout = require('../layout');
const navbar = require('../partials/navbar');
const productForm = require('../partials/productForm');

function editProductPage(data) {
  const productId = data.product._id ? String(data.product._id) : '';
  const formHtml = productForm(data.product, '/dashboard/' + productId, 'Guardar cambios');
  return layout('Editar: ' + data.product.name) + navbar(true) +
    '<main><h1>Editar producto</h1>' + formHtml + '</main>' + layout.close();
}

module.exports = editProductPage;
