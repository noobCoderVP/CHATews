import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  age: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  profession: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
});
