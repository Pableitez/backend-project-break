const Product = require('../models/Product');
const productsListPage = require('../views/pages/productsList');
const productDetailPage = require('../views/pages/productDetail');
const dashboardPage = require('../views/pages/dashboard');
const dashboardProductDetailPage = require('../views/pages/dashboardProductDetail');
const newProductPage = require('../views/pages/newProduct');
const editProductPage = require('../views/pages/editProduct');

function getSort(sort) {
  if (sort === 'price_asc') return { price: 1 };
  if (sort === 'price_desc') return { price: -1 };
  if (sort === 'name_asc') return { name: 1 };
  if (sort === 'name_desc') return { name: -1 };
  return { _id: 1 };
}

const showProducts = async (req, res) => {
  const designer = req.query.designer;
  const category = req.query.category;
  const search = (req.query.search || '').trim();
  const sort = req.query.sort || '';

  const filter = {};
  if (designer && Product.designerEnum.includes(designer)) filter.designer = designer;
  if (category && Product.categoryEnum.includes(category)) filter.category = category;
  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = [{ name: new RegExp(escaped, 'i') }, { description: new RegExp(escaped, 'i') }];
  }

  const products = await Product.find(filter).sort(getSort(sort));

  let title = 'Colección';
  if (designer) title = designer;
  else if (category) title = category;

  const html = productsListPage({
    title,
    products,
    search,
    sort,
    designer,
    category
  });
  res.send(html);
};

const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    const html = productDetailPage({ product });
    res.send(html);
  } catch (err) {
    res.status(404).send('Producto no encontrado');
  }
};

const showDashboard = async (req, res) => {
  const search = (req.query.search || '').trim();
  const sort = req.query.sort || '';

  let filter = {};
  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    filter = { $or: [{ name: regex }, { description: regex }] };
  }

  const products = await Product.find(filter).sort(getSort(sort));

  const html = dashboardPage({
    products,
    search,
    sort,
    msg: req.query.msg
  });
  res.send(html);
};

const showNewProduct = (req, res) => {
  const html = newProductPage({});
  res.send(html);
};

const createProduct = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl || '';
    if (req.file) imageUrl = req.file.path;
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      image: imageUrl,
      designer: req.body.designer,
      category: req.body.category,
      size: req.body.size,
      price: parseFloat(req.body.price)
    });
    res.redirect('/dashboard/' + product._id + '?msg=created');
  } catch (err) {
    res.status(400).send('Error al crear el producto: ' + err.message);
  }
};

const showDashboardProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    const html = dashboardProductDetailPage({
      product,
      msg: req.query.msg
    });
    res.send(html);
  } catch (err) {
    res.status(404).send('Producto no encontrado');
  }
};

const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    const html = editProductPage({ product });
    res.send(html);
  } catch (err) {
    res.status(404).send('Producto no encontrado');
  }
};

const updateProduct = async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      description: req.body.description,
      designer: req.body.designer,
      category: req.body.category,
      size: req.body.size,
      price: parseFloat(req.body.price)
    };
    if (req.file) {
      update.image = req.file.path;
    } else if (req.body.imageUrl !== undefined) {
      update.image = req.body.imageUrl;
    }
    await Product.findByIdAndUpdate(req.params.productId, update);
    res.redirect('/dashboard/' + req.params.productId + '?msg=updated');
  } catch (err) {
    res.status(400).send('Error al actualizar: ' + err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/dashboard?msg=deleted');
  } catch (err) {
    res.status(400).send('Error al eliminar: ' + err.message);
  }
};

module.exports = {
  showProducts,
  showProductById,
  showDashboard,
  showNewProduct,
  createProduct,
  showDashboardProductById,
  showEditProduct,
  updateProduct,
  deleteProduct
};
