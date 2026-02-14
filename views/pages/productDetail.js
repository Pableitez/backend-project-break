const layout = require('../layout');
const navbar = require('../partials/navbar');
const productDetail = require('../partials/productDetail');

function productDetailPage(data) {
  return layout(data.product.name) + navbar(false) +
    '<main>' + productDetail(data.product, false) + '</main></body></html>';
}

module.exports = productDetailPage;
