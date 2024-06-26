const Sequelize = require('sequelize');
require("pg")


const env = process.env.NODE_ENV || 'development';
const config = {
  development: {
    username: "root",
    password: null,
    database: "database_shop_simnatur",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    dialect: 'sqlite',
    storage: process.env.DATABASE_URL || ':memory:'
  },
  production: {
    dialect: 'postgres', // Cambiar a PostgreSQL en producción
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Ajusta esto según tu configuración de SSL
      }
    },
    host: "ep-patient-wind-a5pxrj6x.us-east-2.aws.neon.tech",
    port: "5432",
    username: "neondb_owner",
    password: "2Uq4vtcoLeYx",
    database: "neondb"
  }
}['production']
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
