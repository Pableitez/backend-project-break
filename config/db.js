const mongoose = require('mongoose');

const connectDB = async () => {
  let uri = (process.env.MONGO_URI || '').trim().replace(/\r/g, '');
  if (uri.startsWith('"') && uri.endsWith('"')) uri = uri.slice(1, -1).trim();
  if (uri.startsWith("'") && uri.endsWith("'")) uri = uri.slice(1, -1).trim();
  if (!uri) {
    console.error('Falta MONGO_URI');
    process.exit(1);
  }
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    console.error('MONGO_URI no válida');
    process.exit(1);
  }
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
