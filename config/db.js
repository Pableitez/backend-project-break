const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('Falta MONGO_URI en .env');
    process.exit(1);
  }
  let uri = process.env.MONGO_URI.trim();
  if (uri.includes('\r')) uri = uri.replace(/\r/g, '');
  if (uri.includes('mongodb.net') && !uri.includes('authSource=')) {
    uri += uri.includes('?') ? '&authSource=admin' : '?authSource=admin';
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
