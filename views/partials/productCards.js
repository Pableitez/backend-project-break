const { PLACEHOLDER_IMAGE } = require('../../helpers/constants');

function productCards(products, isDashboard) {
  const placeholderEscaped = PLACEHOLDER_IMAGE.replace(/"/g, '&quot;').replace(/</g, '&lt;');
  let html = '<div class="product-grid">';
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const imgSrc = product.image && product.image.trim() ? product.image.trim() : PLACEHOLDER_IMAGE;
    let desc = product.description.substring(0, 60);
    if (product.description.length > 60) desc += '...';
    const detailUrl = isDashboard ? '/dashboard/' + product._id : '/products/' + product._id;
    const designer = product.designer || '';
    html += '<div class="product-card">';
    html += '<img src="' + imgSrc + '" alt="' + product.name + '" data-placeholder="' + placeholderEscaped + '" onerror="this.onerror=null;this.src=this.dataset.placeholder||\'\'">';
    html += '<div class="content">';
    html += '<p class="card-designer">' + designer + '</p><h2>' + product.name + '</h2>';
    html += '<p>' + desc + '</p><p class="price">' + product.price + ' €</p>';
    html += '<a href="' + detailUrl + '">Ver pieza</a></div></div>';
  }
  html += '</div>';
  return html;
}

module.exports = productCards;
