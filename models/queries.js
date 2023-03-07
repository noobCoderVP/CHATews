import { Sequelize, Model, DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../utils/connection.js";
import admin from "./admin.js";
import user from "./user.js";

const query = sequelize.define(
  "query",
  {
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "id",
        deferrable: Deferrable.INITIALLY_DEFERRED,
      },
      onDelete: "cascade",
    },
    adminid: {
      type: DataTypes.INTEGER,
      references: {
        model: admin,
        key: "id",
        deferrable: Deferrable.INITIALLY_DEFERRED,
      },
      onDelete: "set null",
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isUrgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { freezeTableName: true }
);

export default query;
