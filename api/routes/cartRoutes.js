const express = require('express');
const router = express.Router();


router.get('/', getBlogs);

module.exports = router;
