const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const MessageModel = require("./Message");
const ChatModel = sequelize.define("Chat", {
  // Model attributes are defined here
  chatId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  ownerOne: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ownerTwo: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
  },
});

ChatModel.hasMany(MessageModel, {
  foreignKey: {
    name: "chatId",
    type: DataTypes.UUID,
  },
});
MessageModel.belongsTo(ChatModel, {
  foreignKey: {
    name: "chatId",
    type: DataTypes.UUID,
  },
});
module.exports = ChatModel;
