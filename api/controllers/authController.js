const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, BlacklistedToken } = require('../models');
const JWT_SECRET = 'tu_secreto_jwt';

const signup = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, password: hashedPassword, email });
    const { password: _, ...user } = newUser.toJSON();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    const { password: _, ...userData } = user.toJSON();
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  const token = req.token;
  const decoded = jwt.decode(token);
  const expiresAt = new Date(decoded.exp * 1000);
  await BlacklistedToken.create({ token, expiresAt });
  res.status(200).json({ message: 'Logout successful' });
};

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.sendStatus(404);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login, logout, me };
