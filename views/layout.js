const footer = require('./partials/footer');

function layout(title) {
  if (!title) title = 'Creus';
  return '<!DOCTYPE html><html lang="es"><head>' +
    '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + title + ' | Creus</title>' +
    '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><path d="M22 8a14 14 0 0 0 0 16" stroke="#2c2c2c" stroke-width="1.4" stroke-linecap="round"/><path d="M22 8h2.5M22 24h2.5" stroke="#2c2c2c" stroke-width="1.4" stroke-linecap="round"/></svg>') + '">' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">' +
    '<link rel="stylesheet" href="/css/style.css">' +
    '</head><body>';
}

function close() {
  return footer() + '</body></html>';
}

module.exports = layout;
module.exports.close = close;
