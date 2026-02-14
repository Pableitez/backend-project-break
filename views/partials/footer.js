function footer() {
  const year = new Date().getFullYear();
  return '<footer class="site-footer">' +
    '<div class="footer-inner">' +
    '<nav class="footer-links">' +
    '<a href="/cookies">Política de cookies</a>' +
    '<a href="/aviso-legal">Aviso legal</a>' +
    '<a href="/privacidad">Privacidad</a>' +
    '</nav>' +
    '<p class="footer-copy">© ' + year + ' Pablo Beneitez</p>' +
    '</div></footer>';
}

module.exports = footer;
