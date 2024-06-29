const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const cors = require('cors');
const config = require('../nuxt.config.js');
const nuxt = new Nuxt(config);
const cron = require('node-cron');
const { BlacklistedToken, sequelizeDB } = require('./models');
const { Op } = require('sequelize');

const app = express();
const isDev = true;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

sequelizeDB.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

if (isDev) {
  const builder = new Builder(nuxt);
  builder.build();
}
app.use(nuxt.render);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

cron.schedule('0 0 * * *', async () => {
  const now = new Date();
  await BlacklistedToken.destroy({
    where: {
      expiresAt: {
        [Op.lt]: now
      }
    }
  });
  console.log('Tokens caducados eliminados.');
});

module.exports = {
  path: '/api',
  handle: app
};
