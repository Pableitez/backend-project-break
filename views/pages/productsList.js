const layout = require('../layout');
const navbar = require('../partials/navbar');
const toolbar = require('../partials/toolbar');
const productCards = require('../partials/productCards');

function productsList(data) {
  const toolbarHtml = toolbar({
    type: 'products',
    search: data.search,
    sort: data.sort,
    designer: data.designer,
    category: data.category
  });
  return layout('Colección') + navbar(false) +
    '<main class="collection">' + toolbarHtml + '<h1>' + data.title + '</h1>' +
    productCards(data.products, false) + '</main></body></html>';
}

module.exports = productsList;
