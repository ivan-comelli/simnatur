const pg = require("pg");

const config = {
  development: {
    username: "root",
    password: "root",
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
    host: "ep-patient-wind-a5pxrj6x.us-east-2.aws.neon.tech",
    port: "5432",
    username: "neondb_owner",
    password: "2Uq4vtcoLeYx",
    database: "neondb",
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
