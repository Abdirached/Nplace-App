const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("maindb", "postgres", "main1234", {
  host: "localhost",
  dialect: "postgres",
});
const MessageModel = sequelize.define("Message", {
  // Model attributes are defined here
  messageId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
module.exports = MessageModel;
