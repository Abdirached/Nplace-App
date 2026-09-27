const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const CommentReplyModel = require("./CommentReply");
const CommentModel = sequelize.define("Comment", {
  // Model attributes are defined here
  commentId: {
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

CommentModel.hasMany(CommentReplyModel, {
  foreignKey: {
    name: "commentId",
    type: DataTypes.UUID,
  },
});
CommentReplyModel.belongsTo(CommentModel, {
  foreignKey: {
    name: "commentId",
    type: DataTypes.UUID,
  },
});
module.exports = CommentModel;
