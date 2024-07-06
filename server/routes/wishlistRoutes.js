const express = require('express');
const router = express.Router();
const { addItemWishlist } = require('../controllers/wishlistController');


router.post('/', addItemWishlist);

module.exports = router;
