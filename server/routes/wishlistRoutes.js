const express = require('express');
const router = express.Router();
const { addItemWishlist, getWishlistItems } = require('../controllers/wishlistController');
const { authenticateToken } = require('../middleware/authMiddleware')

router.post('/', authenticateToken, addItemWishlist);
router.get('/', authenticateToken, getWishlistItems);

module.exports = router;
