const layout = require('../layout');
const navbar = require('../partials/navbar');
const toolbar = require('../partials/toolbar');
const productCards = require('../partials/productCards');
const flash = require('../partials/flash');

function dashboardPage(data) {
  const toolbarHtml = toolbar({
    type: 'dashboard',
    search: data.search,
    sort: data.sort
  });
  return layout('Dashboard') + navbar(true) +
    '<main>' + flash(data.msg) + '<h1>Dashboard — Colección</h1>' + toolbarHtml +
    productCards(data.products, true) + '</main>' + layout.close();
}

module.exports = dashboardPage;
