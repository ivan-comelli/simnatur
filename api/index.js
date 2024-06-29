// server/index.js

const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();
const isDev = true //process.env.NODE_ENV !== 'production';
const config = require('../nuxt.config.js');
const nuxt = new Nuxt(config);

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database_shop_simnatur', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const JWT_SECRET = 'tu_secreto_jwt';

const User = require('./models/user')(sequelize, Sequelize.DataTypes);
const Product = require('./models/product')(sequelize, Sequelize.DataTypes);
const BlacklistedToken = require('./models/blacklistedtoken')(sequelize, Sequelize.DataTypes);
const Blog = require('./models/blog')(sequelize, Sequelize.DataTypes);

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:3000', // URL del frontend
  optionsSuccessStatus: 200 // para navegadores antiguos
};
app.use(cors(corsOptions));
// Middleware para parsear JSON
app.use(express.json());

// Inicialización de Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  // Verificar si el token está en la lista negra
  const blacklistedToken = await BlacklistedToken.findOne({ where: { token } });
  if (blacklistedToken) {
    return res.status(403).json({ error: 'Token is blacklisted.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token.' });
    }

    // Verificar el tiempo de expiración del token
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    if (decoded.exp < currentTime) {
      return res.status(401).json({ error: 'Token has expired.' });
    }

    // Guardar el id de usuario para su uso en otras rutas
    req.userId = decoded.id;
    req.token = token;
    next();
  });
};

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/logout', authenticateToken, async (req, res) => {
  const token = req.token;
  const decoded = jwt.decode(token);
  const expiresAt = new Date(decoded.exp * 1000); // Convertir a milisegundos
  await BlacklistedToken.create({ token, expiresAt });
  res.status(200).json({ message: 'Logout successful' });
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.sendStatus(404);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/signup', async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, password: hashedPassword, email });
    // Opcional: puedes omitir enviar la contraseña en la respuesta
    const { password: _, ...user } = newUser.toJSON();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    // Opcional: puedes omitir enviar la contraseña en la respuesta
    const { password: _, ...userData } = user.toJSON();
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// Middleware de Nuxt
if (isDev) {
  const builder = new Builder(nuxt);
  builder.build();
}
app.use(nuxt.render);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const cron = require('node-cron');
const blog = require('./models/blog.js');

// Tarea programada para limpiar tokens caducados cada día
cron.schedule('0 0 * * *', async () => {
  const now = new Date();
  await BlacklistedToken.destroy({
    where: {
      expiresAt: {
        [Op.lt]: now // Elimina tokens cuya fecha de expiración es menor a la fecha actual
      }
    }
  });
  console.log('Tokens caducados eliminados.');
});

module.exports = {
    path: '/api',
    handle: app
  };