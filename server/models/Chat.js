const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("maindb", "postgres", "main1234", {
  host: "localhost",
  dialect: "postgres",
});
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
