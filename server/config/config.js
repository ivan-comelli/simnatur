const pg = require("pg");
require('dotenv').config();

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
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Ajusta esto según tu configuración de SSL
      }
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialectModule: pg,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = config;
