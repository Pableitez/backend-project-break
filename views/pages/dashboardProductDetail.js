const layout = require('../layout');
const navbar = require('../partials/navbar');
const productDetail = require('../partials/productDetail');
const flash = require('../partials/flash');

function dashboardProductDetailPage(data) {
  return layout(data.product.name) + navbar(true) +
    '<main>' + flash(data.msg) + productDetail(data.product, true) + '</main>' + layout.close();
}

module.exports = dashboardProductDetailPage;
