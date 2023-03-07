import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
    const sequelize = new Sequelize(
        process.env.PGDATABASE,
        process.env.PGUSER,
        process.env.PGPASSWORD,
        {
            host: process.env.PGHOST,
            dialect: "postgres",
        },
    );
    try {
        await sequelize.authenticate();
        return true;
    } catch (err) {
        return false;
    }
};
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: "postgres",
    },
);

export { connection, sequelize };
