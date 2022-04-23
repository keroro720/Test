import * as DotEnv from "dotenv";

DotEnv.config();

const knexConfig = {
    client: "pg",
    connection: {
        host: "parking-app-db",
        database: "postgres",
        port: "5432",
        user: "postgres",
        password: "postgres"
    },
    migrations: {
        directory: "./migrations/",
        tableName: 'knex_migrations'
      },
};

module.exports = knexConfig;