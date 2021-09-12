const express = require("express");
const app = express();
const cors = require("cors");
const { Sequelize } = require("sequelize");
const UserModel = require("./models/User");
const PostModel = require("./models/Post");
const CommentModel = require("./models/Comment");
const CommentReplyModel = require("./models/CommentReply");
const NotificationModel = require("./models/Notification");
require("dotenv").config();
// connect DB
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.HOST, dialect: process.env.DIALECT }
);
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const modelSync = async function dbSync() {
  try {
    const userTable = await UserModel.sync();
    const postTable = await PostModel.sync();
    const commentTable = await CommentModel.sync();
    const commentReplyTable = await CommentReplyModel.sync();
    const notificationTable = await NotificationModel.sync();
    console.log("done");
  } catch (error) {
    console.error("not done");
  }
};
modelSync();
app.use(cors());
app.use(express.json()); //Used to parse JSON bodies

// routes
// posts route
const postsRouter = require("./routes/Posts");
app.use("/Posts", postsRouter);
// //users signup route
const signupRouter = require("./routes/SignUp");
app.use("/SignUp", signupRouter);
// //users login route
const signinRouter = require("./routes/SignIn");
app.use("/SignIn", signinRouter);
//Userprofile route
const profileRouter = require("./routes/Profile");
app.use("/Profile", profileRouter);
//Notification route
const notificationRouter = require("./routes/Notifications");
app.use("/Notifications", notificationRouter);
//presigned route
const storageRouter = require("./routes/Storage");
app.use("/Storage", storageRouter);
// forgot password route
const forgotPasswordRouter = require("./routes/ForgetPassword");
app.use("/forgot-password", forgotPasswordRouter);

app.listen(5000, console.log("server is running on 5000"));
