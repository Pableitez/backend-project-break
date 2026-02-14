const layout = require('../layout');
const navbar = require('../partials/navbar');
const productForm = require('../partials/productForm');

function newProductPage(data) {
  const formHtml = productForm(null, '/dashboard', 'Añadir pieza');
  return layout('Nueva pieza') + navbar(true) +
    '<main><h1>Nueva pieza</h1>' + formHtml + '</main>' + layout.close();
}

module.exports = newProductPage;
