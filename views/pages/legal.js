const layout = require('../layout');
const navbar = require('../partials/navbar');

function legalPage(title, content) {
  return layout(title) + navbar(false) +
    '<main class="legal-page"><h1>' + title + '</h1><div class="legal-content">' +
    content + '</div></main>' + layout.close();
}

module.exports = legalPage;
