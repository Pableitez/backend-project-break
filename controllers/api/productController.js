const Product = require('../../models/Product');

function getSort(sort) {
  if (sort === 'price_asc') return { price: 1 };
  if (sort === 'price_desc') return { price: -1 };
  if (sort === 'name_asc') return { name: 1 };
  if (sort === 'name_desc') return { name: -1 };
  return { _id: 1 };
}

const list = async (req, res) => {
  try {
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
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image || '',
      designer: req.body.designer,
      category: req.body.category,
      size: req.body.size,
      price: parseFloat(req.body.price)
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      designer: req.body.designer,
      category: req.body.category,
      size: req.body.size,
      price: parseFloat(req.body.price)
    };
    if (req.body.image !== undefined) updateData.image = req.body.image;
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove
};
