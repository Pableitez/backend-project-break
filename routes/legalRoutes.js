const express = require('express');
const router = express.Router();
const legalController = require('../controllers/legalController');

router.get('/cookies', legalController.showCookies);
router.get('/aviso-legal', legalController.showAvisoLegal);
router.get('/privacidad', legalController.showPrivacidad);

module.exports = router;
