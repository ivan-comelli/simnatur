import pg from "pg"

module.exports = {
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
        rejectUnauthorized: true // Ajusta esto según tu configuración de SSL
      }
    },
    host: "ep-patient-wind-a5pxrj6x.us-east-2.aws.neon.tech",
    port: "5432",
    username: "neondb_owner",
    password: "2Uq4vtcoLeYx",
    database: "neondb",
    dialectModule: pg,
  }
};