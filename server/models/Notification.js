const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
// const CommentReplyModel = require("./CommentReply");
const NotificationModel = sequelize.define("Notification", {
  // Model attributes are defined here
  notificationId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  actorId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  recipientId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notifiableId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  notifiableObject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = NotificationModel;
