function toolbar(data) {
  const type = data.type;
  const search = data.search || '';
  const sort = data.sort || '';
  const baseUrl = type === 'products' ? '/products' : '/dashboard';

  let sep = '';
  if (type === 'products') {
    const parts = [];
    if (data.designer) parts.push('designer=' + encodeURIComponent(data.designer));
    if (data.category) parts.push('category=' + encodeURIComponent(data.category));
    if (search) parts.push('search=' + encodeURIComponent(search));
    sep = parts.length ? parts.join('&') + '&' : '';
  } else {
    sep = search ? 'search=' + encodeURIComponent(search) + '&' : '';
  }

  let clearHref = baseUrl;
  if (type === 'products') {
    const clearParts = [];
    if (data.designer) clearParts.push('designer=' + encodeURIComponent(data.designer));
    if (data.category) clearParts.push('category=' + encodeURIComponent(data.category));
    if (clearParts.length) clearHref = baseUrl + '?' + clearParts.join('&');
  }

  let html = '<div class="list-toolbar">';
  html += '<form method="GET" action="' + baseUrl + '" class="search-form">';
  if (type === 'products' && data.designer) html += '<input type="hidden" name="designer" value="' + data.designer + '">';
  if (type === 'products' && data.category) html += '<input type="hidden" name="category" value="' + data.category + '">';
  if (sort) html += '<input type="hidden" name="sort" value="' + sort + '">';
  html += '<input type="search" name="search" placeholder="Buscar..." value="' + search.replace(/"/g, '&quot;') + '">';
  html += '<button type="submit" class="btn-search">Buscar</button>';
  if (search) html += '<a href="' + clearHref + '" class="search-clear">Limpiar</a>';
  html += '</form>';
  html += '<div class="sort-group"><span class="sort-label">Ordenar</span><div class="sort-links">';

  const sortOptions = [['price_asc', 'Precio ↑'], ['price_desc', 'Precio ↓'], ['name_asc', 'A–Z'], ['name_desc', 'Z–A']];
  for (let i = 0; i < sortOptions.length; i++) {
    const key = sortOptions[i][0];
    const label = sortOptions[i][1];
    const active = sort === key ? ' sort-link-active' : '';
    html += '<a href="' + baseUrl + '?' + sep + 'sort=' + key + '" class="sort-link' + active + '">' + label + '</a>';
  }
  html += '</div></div></div>';
  return html;
}

module.exports = toolbar;
