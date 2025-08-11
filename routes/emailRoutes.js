const express = require('express');
const router = express.Router();
const { storeEmail, getAllEmails } = require('../controllers/emailController');

router.post('/store-email', storeEmail);

router.get('/emails', getAllEmails);


module.exports = router;