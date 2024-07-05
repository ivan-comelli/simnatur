const pg = require("pg");

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
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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
