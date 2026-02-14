const mongoose = require('mongoose');

const categoryEnum = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];
const sizeEnum = ['XS', 'S', 'M', 'L', 'XL'];
const designerEnum = [
  'Puig de Paní',
  'Serra de Rodes',
  'Port Lligat',
  'Cala Nans',
  'Es Sortell',
  'Cap de Creus'
];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  designer: {
    type: String,
    required: true,
    enum: designerEnum
  },
  category: {
    type: String,
    required: true,
    enum: categoryEnum
  },
  size: {
    type: String,
    required: true,
    enum: sizeEnum
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
module.exports.categoryEnum = categoryEnum;
module.exports.sizeEnum = sizeEnum;
module.exports.designerEnum = designerEnum;
