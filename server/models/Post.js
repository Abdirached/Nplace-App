const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("maindb", "postgres", "main1234", {
  host: "localhost",
  dialect: "postgres",
});
const CommentModel = require("./Comment");
const CommentReplyModel = require("./CommentReply");
const PostModel = sequelize.define("Post", {
  // Model attributes are defined here
  postId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

PostModel.hasMany(CommentModel, {
  foreignKey: {
    name: "postId",
    type: DataTypes.UUID,
  },
});
CommentModel.belongsTo(PostModel, {
  foreignKey: {
    name: "postId",
    type: DataTypes.UUID,
  },
});
PostModel.hasMany(CommentReplyModel, {
  foreignKey: {
    name: "postId",
    type: DataTypes.UUID,
  },
});
CommentReplyModel.belongsTo(PostModel, {
  foreignKey: {
    name: "postId",
    type: DataTypes.UUID,
  },
});

module.exports = PostModel;
