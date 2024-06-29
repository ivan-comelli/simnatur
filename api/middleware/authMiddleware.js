const jwt = require('jsonwebtoken');
const { BlacklistedToken } = require('../models');
const JWT_SECRET = 'tu_secreto_jwt';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  const blacklistedToken = await BlacklistedToken.findOne({ where: { token } });
  if (blacklistedToken) {
    return res.status(403).json({ error: 'Token is blacklisted.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token.' });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return res.status(401).json({ error: 'Token has expired.' });
    }

    req.userId = decoded.id;
    req.token = token;
    next();
  });
};

module.exports = { authenticateToken };
