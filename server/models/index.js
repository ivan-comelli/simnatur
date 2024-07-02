const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env]
console.log(config)
const sequelizeDB = new Sequelize(config.database, config.username, config.password, config);
const User = require('./user')(sequelizeDB, Sequelize.DataTypes);
const Product = require('./product')(sequelizeDB, Sequelize.DataTypes);
const BlacklistedToken = require('./blacklistedtoken')(sequelizeDB, Sequelize.DataTypes);
const Blog = require('./blog')(sequelizeDB, Sequelize.DataTypes);

const db = {
  sequelizeDB,
  Sequelize,
  User,
  Product,
  BlacklistedToken,
  Blog,
};

module.exports = db;
