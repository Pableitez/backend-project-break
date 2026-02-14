const layout = require('../layout');
const navbar = require('../partials/navbar');
const productForm = require('../partials/productForm');

function editProductPage(data) {
  const formHtml = productForm(data.product, '/dashboard/' + data.product._id, 'Guardar cambios');
  return layout('Editar: ' + data.product.name) + navbar(true) +
    '<main><h1>Editar producto</h1>' + formHtml + '</main></body></html>';
}

module.exports = editProductPage;
