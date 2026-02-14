function flash(msg) {
  if (msg === 'created') return '<div class="flash flash-success">Producto creado correctamente.</div>';
  if (msg === 'updated') return '<div class="flash flash-success">Producto actualizado.</div>';
  if (msg === 'deleted') return '<div class="flash flash-success">Producto eliminado.</div>';
  return '';
}

module.exports = flash;
