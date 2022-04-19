import * as DotEnv from "dotenv"

DotEnv.config();

module.exports = {
    clent: process.env.DATABASE_DRIVER,
    connection: {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_DATABASE,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    },
    pool: {
        min: parseInt(process.env.DATABASE_POOL_MIN),
        max: parseInt(process.env.DATABASE_POOL_MAX),
        refreshIdle: false
    }
}