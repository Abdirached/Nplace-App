const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const CommentReplyModel = sequelize.define("CommentReply", {
  // Model attributes are defined here
  commentReplyId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = CommentReplyModel;
