const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadCloudinaryMiddleware');
const requireAuth = require('../middlewares/authMiddleware');

router.get('/', (req, res) => res.redirect('/products'));

router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);

router.get('/dashboard', requireAuth, productController.showDashboard);
router.get('/dashboard/new', requireAuth, productController.showNewProduct);
router.post('/dashboard', requireAuth, upload.single('image'), productController.createProduct);
router.get('/dashboard/:productId', requireAuth, productController.showDashboardProductById);
router.get('/dashboard/:productId/edit', requireAuth, productController.showEditProduct);
router.put('/dashboard/:productId', requireAuth, upload.single('image'), productController.updateProduct);
router.delete('/dashboard/:productId/delete', requireAuth, productController.deleteProduct);
router.post('/dashboard/:productId/delete', requireAuth, productController.deleteProduct);

module.exports = router;
