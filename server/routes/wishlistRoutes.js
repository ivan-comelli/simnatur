const express = require('express');
const router = express.Router();
const { addItemWishlist, getWishlistItems, removeItemWishlist } = require('../controllers/wishlistController');
const { authenticateToken } = require('../middleware/authMiddleware')

router.post('/', authenticateToken, addItemWishlist);
router.get('/', authenticateToken, getWishlistItems);
router.delete('/:id', authenticateToken, removeItemWishlist);
module.exports = router;
