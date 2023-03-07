import { Sequelize, Model, DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../utils/connection.js";
import user from "./user.js";

const admin = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: user,
        key: "id",
        deferrable: Deferrable.INITIALLY_DEFERRED,
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default admin;
