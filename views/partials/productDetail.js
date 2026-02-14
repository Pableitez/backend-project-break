const { PLACEHOLDER_IMAGE } = require('../../helpers/constants');

const placeholderAttr = PLACEHOLDER_IMAGE.replace(/"/g, '&quot;').replace(/</g, '&lt;');

function productDetail(product, isDashboard) {
  const img = product.image && product.image.trim() ? product.image.trim() : PLACEHOLDER_IMAGE;
  let html = '<div class="product-detail">';
  html += '<p class="designer-label">' + product.designer + '</p>';
  html += '<h1>' + product.name + '</h1>';
  html += '<img src="' + img + '" alt="' + product.name + '" data-placeholder="' + placeholderAttr + '" onerror="this.onerror=null;this.src=this.dataset.placeholder||\'\'">';
  html += '<p>' + product.description + '</p>';
  html += '<p><strong>Colección:</strong> ' + product.designer + ' &nbsp;|&nbsp; <strong>Talla:</strong> ' + product.size + '</p>';
  html += '<p class="price">' + product.price + ' €</p>';
  if (isDashboard) {
    html += '<div class="actions">';
    html += '<a href="/dashboard/' + product._id + '/edit">Editar</a>';
    html += '<form action="/dashboard/' + product._id + '/delete" method="POST" class="form-inline">';
    html += '<input type="hidden" name="_method" value="DELETE"><button type="submit" class="btn-danger">Eliminar</button></form></div>';
    html += '<a href="/dashboard">Volver al dashboard</a>';
  } else {
    html += '<a href="/products">Volver a la colección</a>';
  }
  html += '</div>';
  return html;
}

module.exports = productDetail;
