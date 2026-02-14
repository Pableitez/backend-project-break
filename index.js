require('dotenv').config();

const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error('No se pudo iniciar:', err.message);
  process.exit(1);
});
