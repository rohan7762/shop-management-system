const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { createSale, getSales } = require('../controllers/saleController');

const router = express.Router();

router.use(protect);

router.post('/', createSale);
router.get('/', getSales);

module.exports = router;
