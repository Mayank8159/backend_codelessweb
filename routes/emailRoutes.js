const express = require('express');
const router = express.Router();
const { storeEmail } = require('../controllers/emailController');

router.post('/store-email', storeEmail);

module.exports = router;