const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env]
const sequelizeDB = new Sequelize(config.database, config.username, config.password, config);
const User = require('./user')(sequelizeDB, Sequelize.DataTypes);
const Product = require('./product')(sequelizeDB, Sequelize.DataTypes);
const BlacklistedToken = require('./blacklistedtoken')(sequelizeDB, Sequelize.DataTypes);
const Blog = require('./blog')(sequelizeDB, Sequelize.DataTypes);
const { MercadoPagoConfig, Preference } = require('mercadopago');

console.log(process.env.ACCESS_TOKEN_MP)
const clientMP = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP, options: { timeout: 5000, idempotencyKey: 'abc' } });
const preferenceMP = new Preference(clientMP);
const db = {
  sequelizeDB,
  Sequelize,
  User,
  Product,
  BlacklistedToken,
  Blog,
  preferenceMP
};

module.exports = db;
