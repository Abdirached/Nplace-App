const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("maindb", "postgres", "main1234", {
  host: "localhost",
  dialect: "postgres",
});
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
    validate: {
      notEmpty: true,
    },
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
