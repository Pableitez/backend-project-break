const Product = require('../../models/Product');

function productForm(product, actionUrl, submitLabel) {
  const name = product ? product.name : '';
  const description = product ? product.description : '';
  const image = product ? product.image : '';
  const price = product && product.price !== undefined && product.price !== null ? product.price : '';

  let designers = '';
  for (let i = 0; i < Product.designerEnum.length; i++) {
    const d = Product.designerEnum[i];
    const selected = product && product.designer === d ? ' selected' : '';
    designers += '<option value="' + d + '"' + selected + '>' + d + '</option>';
  }
  let categories = '';
  for (let i = 0; i < Product.categoryEnum.length; i++) {
    const c = Product.categoryEnum[i];
    const selected = product && product.category === c ? ' selected' : '';
    categories += '<option value="' + c + '"' + selected + '>' + c + '</option>';
  }
  let sizes = '';
  for (let i = 0; i < Product.sizeEnum.length; i++) {
    const s = Product.sizeEnum[i];
    const selected = product && product.size === s ? ' selected' : '';
    sizes += '<option value="' + s + '"' + selected + '>' + s + '</option>';
  }

  const method = product ? 'PUT' : 'POST';
  return '<form action="' + actionUrl + '" method="POST" enctype="multipart/form-data">' +
    '<input type="hidden" name="_method" value="' + method + '">' +
    '<label for="name">Nombre de la pieza</label><input type="text" id="name" name="name" value="' + name + '" required>' +
    '<label for="description">Descripción</label><textarea id="description" name="description" rows="3" required>' + description + '</textarea>' +
    '<label for="image">Subir imagen</label><input type="file" id="image" name="image" accept="image/jpeg,image/png,image/webp">' +
    '<label for="imageUrl">O pega la URL de Cloudinary</label><input type="url" id="imageUrl" name="imageUrl" value="' + image + '" placeholder="https://res.cloudinary.com/...">' +
    '<small class="form-hint">Sube un archivo o pega la URL que te devuelve Cloudinary.</small>' +
    '<label for="designer">Colección</label><select id="designer" name="designer" required><option value="">Selecciona colección</option>' + designers + '</select>' +
    '<label for="category">Categoría</label><select id="category" name="category" required><option value="">Selecciona categoría</option>' + categories + '</select>' +
    '<label for="size">Talla</label><select id="size" name="size" required><option value="">Selecciona talla</option>' + sizes + '</select>' +
    '<label for="price">Precio (€)</label><input type="number" id="price" name="price" step="0.01" min="0" value="' + price + '" required>' +
    '<button type="submit">' + submitLabel + '</button></form>';
}

module.exports = productForm;
