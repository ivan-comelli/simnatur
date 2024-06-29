const Sequelize = require('sequelize');
const sequelizeDB = new Sequelize('database_shop_simnatur', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = require('./user')(sequelizeDB, Sequelize.DataTypes);
const Product = require('./product')(sequelizeDB, Sequelize.DataTypes);
const BlacklistedToken = require('./blacklistedtoken')(sequelizeDB, Sequelize.DataTypes);
const Blog = require('./blog')(sequelizeDB, Sequelize.DataTypes);

// Definir asociaciones aquí si es necesario
// User.hasMany(Product, { foreignKey: 'userId' });
// Product.belongsTo(User, { foreignKey: 'userId' });

const db = {
  sequelizeDB,
  Sequelize,
  User,
  Product,
  BlacklistedToken,
  Blog,
};

module.exports = db;
