require('dotenv').config();

const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const productApiRoutes = require('./routes/api/productRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'creus-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', authRoutes);
app.use('/api/products', productApiRoutes);
app.use('/', productRoutes);

module.exports = app;
