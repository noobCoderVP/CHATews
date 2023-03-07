import { Sequelize, Model, DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../utils/connection.js";
import user from "./user.js";

const filter = sequelize.define(
  "filter",
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
    applied: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    countries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ["in"],
    },
    sources: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ["Times of india"],
    },
    keywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ["education"],
    },
    forInterval: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "week",
    },
    maxArticles: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 20,
    },
    sortBy: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ["date", "popularity"],
    },
  },
  { freezeTableName: true }
);

export default filter;
