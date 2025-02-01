import { Sequelize } from "sequelize";

const host = String(process.env.DB_HOST);
const password = process.env.DB_PASSWORD;
const database = String(process.env.DB_NAME);
const user = String(process.env.DB_USER);

export const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
    host
})