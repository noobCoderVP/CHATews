import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );
  try {
    await sequelize.authenticate();
    return true;
  } catch (err) {
    return false;
  }
};
export default connection;
const result = await connection();
console.log(result);
