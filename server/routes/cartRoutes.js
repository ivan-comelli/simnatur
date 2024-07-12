const express = require('express');
const router = express.Router();
const { addItemCart, getCartItems, removeItemCart, updateCartItem } = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, addItemCart);
router.get('/', authenticateToken, getCartItems);
router.delete('/:id', authenticateToken, removeItemCart);
router.put('/', authenticateToken, updateCartItem);

module.exports = router;
