const Product = require('../../models/Product');

function navbar(isDashboard) {
  let html = '<nav class="navbar"><div class="navbar-inner">';
  html += '<a href="/products" class="navbar-brand"><span class="brand-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 7a12 12 0 1 1 0 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span> Creus</a>';
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
