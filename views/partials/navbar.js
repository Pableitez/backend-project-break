const Product = require('../../models/Product');

const logoCreusSvg = '<svg class="brand-logo" viewBox="0 0 92 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<g stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M14 3.5a10.5 10.5 0 0 0 0 17"/><path d="M14 3.5h2.2M14 20.5h2.2"/>' +
  '<path d="M21 20.5V5.5M21 5.5q3.5 0 3.5 2.8"/>' +
  '<path d="M30 5.5h8M30 13h9M30 5.5a3.5 3.5 0 0 1 0 7M30 13a3.5 3.5 0 0 0 0 7"/>' +
  '<path d="M45 5.5v10.5a4.5 4.5 0 0 0 9 0V5.5"/>' +
  '<path d="M60 6.5a4.5 4.5 0 0 0-6 5.5 4.5 4.5 0 0 1 6 5.5"/>' +
  '</g></svg>';

function navbar(isDashboard) {
  let html = '<nav class="navbar"><div class="navbar-inner">';
  html += '<a href="/products" class="navbar-brand" aria-label="Creus">' + logoCreusSvg + '</a>';
  html += '<input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true">';
  html += '<label for="nav-toggle" class="navbar-toggle" aria-label="Abrir menú"><span></span><span></span><span></span></label>';
  html += '<div class="navbar-menu"><div class="navbar-links">';
  html += '<a href="/products">Todas</a>';
  for (let i = 0; i < Product.designerEnum.length; i++) {
    const col = Product.designerEnum[i];
    html += '<a href="/products?designer=' + encodeURIComponent(col) + '">' + col + '</a>';
  }
  html += '</div><div class="navbar-actions">';
  if (isDashboard) {
    html += '<a href="/dashboard">Dashboard</a><a href="/dashboard/new">Nueva pieza</a><a href="/logout">Salir</a>';
  } else {
    html += '<a href="/dashboard">Admin</a>';
  }
  html += '</div></div></div></nav>';
  return html;
}

module.exports = navbar;
