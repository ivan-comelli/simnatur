const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env]
const sequelizeDB = new Sequelize(config.database, config.username, config.password, config);
const User = require('./user')(sequelizeDB, Sequelize.DataTypes);
const Product = require('./product')(sequelizeDB, Sequelize.DataTypes);
const BlacklistedToken = require('./blacklistedtoken')(sequelizeDB, Sequelize.DataTypes);
const Blog = require('./blog')(sequelizeDB, Sequelize.DataTypes);
const Favorite = require('./favorite')(sequelizeDB, Sequelize.DataTypes);
const Cart = require('./cart')(sequelizeDB, Sequelize.DataTypes);

const { MercadoPagoConfig, Preference } = require('mercadopago');

const clientMP = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP, options: { timeout: 5000, idempotencyKey: 'abc' } });
const preferenceMP = new Preference(clientMP);

Product.hasMany(Favorite, { foreignKey: 'productId' });
Favorite.belongsTo(Product, { foreignKey: 'productId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Cart, { foreignKey: 'productId' });
User.hasMany(Cart, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });

const db = {
  sequelizeDB,
  Sequelize,
  User,
  Product,
  BlacklistedToken,
  Blog,
  Favorite,
  Cart,
  preferenceMP
};

module.exports = db;
