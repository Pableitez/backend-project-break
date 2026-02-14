const legalPage = require('../views/pages/legal');

const showCookies = (req, res) => {
  const c = '<p>Este sitio utiliza cookies técnicas necesarias para el funcionamiento de la web y la sesión del usuario.</p>' +
    '<p>No se usan cookies de terceros ni de seguimiento. Al navegar aceptas el uso de estas cookies.</p>';
  res.send(legalPage('Política de cookies', c));
};

const showAvisoLegal = (req, res) => {
  const c = '<p>Creus es una tienda de ropa. Titular: Pablo Beneitez.</p>' +
    '<p>Los contenidos de este sitio tienen carácter informativo. Se reservan los derechos de propiedad intelectual sobre los textos e imágenes.</p>';
  res.send(legalPage('Aviso legal', c));
};

const showPrivacidad = (req, res) => {
  const c = '<p>Los datos que proporciones (por ejemplo en el acceso al dashboard) se usan solo para la gestión de la sesión y no se ceden a terceros.</p>' +
    '<p>Puedes contactar para ejercer tus derechos sobre tus datos.</p>';
  res.send(legalPage('Privacidad', c));
};

module.exports = {
  showCookies,
  showAvisoLegal,
  showPrivacidad
};
