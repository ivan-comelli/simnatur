const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { BlacklistedToken, sequelizeDB } = require('./models');
const { Op } = require('sequelize');
const env = 'production' //process.env.NODE_ENV || 'development';
const app = express();

app.use(express.json());
app.use(cors());

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

if (env == "development") {
  const { Nuxt, Builder } = require('nuxt');
  const config = require('../nuxt.config.js');
  const nuxt = new Nuxt(config);

  const builder = new Builder(nuxt);
  builder.build();

  app.use(nuxt.render);
}

const PORT = 3010;
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
