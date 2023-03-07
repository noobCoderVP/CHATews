import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/connection.js";

const user = sequelize.define(
  "user",
  {
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
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

export default user;
