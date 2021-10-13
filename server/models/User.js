const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("maindb", "postgres", "main1234", {
  host: "localhost",
  dialect: "postgres",
});
const PostModel = require("./Post");
const CommentModel = require("./Comment");
const CommentReplyModel = require("./CommentReply");
const NotificationModel = require("./Notification");
const ChatModel = require("./Chat");
const MessageModel = require("./Message");
const UserModel = sequelize.define("User", {
  // Model attributes are defined here
  userId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },
  phonenumber: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue:
      "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    validate: {
      isUrl: true,
    },
  },
});

UserModel.hasMany(PostModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
  },
});
PostModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
  },
});
UserModel.hasMany(CommentModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
  },
});
CommentModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
  },
});
UserModel.hasMany(CommentReplyModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
  },
});
CommentReplyModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
  },
});
UserModel.hasMany(NotificationModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
  },
});
NotificationModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.UUID,
  },
});
UserModel.hasMany(MessageModel, {
  foreignKey: {
    name: "senderId",
    type: DataTypes.UUID,
  },
  as: "OutgoingMessages",
});

UserModel.hasMany(MessageModel, {
  foreignKey: {
    name: "receiverId",
    type: DataTypes.UUID,
  },
  as: "IncomingMessages",
});
MessageModel.belongsTo(UserModel, {
  foreignKey: {
    name: "senderId",
    type: DataTypes.UUID,
  },
  as: "Sender",
});
MessageModel.belongsTo(UserModel, {
  foreignKey: {
    name: "receiverId",
    type: DataTypes.UUID,
  },
  as: "Receiver",
});
module.exports = UserModel;
