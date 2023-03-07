import { Sequelize, Model, DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../utils/connection.js";
import user from "./user.js";

const email = sequelize.define(
  "email",
  {
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "id",
        deferrable: Deferrable.INITIALLY_DEFERRED,
      },
    },
    frequency: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    atTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { freezeTableName: true }
);

export default email;
