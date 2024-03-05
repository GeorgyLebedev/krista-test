import {Dialect, Sequelize} from "sequelize";
import 'dotenv/config'
export const connection = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD,
    {
        port: process.env.DB_PORT as number|undefined,
        dialect: process.env.DB_DIALECT as Dialect
    }
)
