const express = require('express');
const { addSale } = require('../Controllers/salesController');
const requireAuth = require('../Middleware/reqAuth'); // Assuming you have middleware for authentication

const router = express.Router();

router.use(requireAuth);

router.post('/sales', addSale);

module.exports = router;
