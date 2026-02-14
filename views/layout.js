function layout(title) {
  if (!title) title = 'Creus';
  return '<!DOCTYPE html><html lang="es"><head>' +
    '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + title + '</title>' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">' +
    '<link rel="stylesheet" href="/css/style.css">' +
    '</head><body>';
}

module.exports = layout;
