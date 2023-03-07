import { Sequelize, Model, DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../utils/connection.js";
import user from "./user.js";

const friend = sequelize.define(
  "friend",
  {
    senderid: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "id",
        deferrable: Deferrable.INITIALLY_DEFERRED,
      },
    },
    receiverid: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "id",
        deferrable: Deferrable.INITIALLY_DEFERRED,
      },
    },
    sentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    acceptedAt: {
      type: DataTypes.DATE,
    },
    isBestFriend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default friend;
