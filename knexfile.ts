import * as DotEnv from "dotenv"

DotEnv.config();

module.exports = {
    client: process.env.DATABASE_DRIVER,
    connection: {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_DATABASE,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    },
    migrations: {
        directory: "./migrations/",
        tableName: 'knex_migrations'
      },
}