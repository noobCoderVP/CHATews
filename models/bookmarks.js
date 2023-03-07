import { Sequelize, Model, DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../utils/connection.js";
import user from "./user.js";

const bookmark = sequelize.define(
  "bookmark",
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
    source: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default bookmark;
