const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const cors = require("cors");
// socketio
io.on("connection", (socket) => {
  const user = socket.handshake.query.user;
  console.log(user);
  socket.join(user);
  socket.on("sendMessage", (data) => {
    console.log(data.text);
    io.to(data.senderId).to(data.receiverId).emit("getMessage", data);
  });
  socket.on(
    "chatStatus",
    ({ senderId, receiverId, messageId, chatId, isRead }) => {
      socket.to(senderId).to(receiverId).emit("getChatStatus", {
        senderId,
        receiverId,
        messageId,
        chatId,
        isRead,
      });
    }
  );
  socket.on("newPost", (data) => {
    socket.broadcast.emit("getNewPost", data);
  });
  socket.on("newChat", (data) => {
    socket.to(data.ownerOne).to(data.ownerTwo).emit("getNewchat", data);
  });
  console.log("a user connected");
});
// importing models (all models share one connection from ./db)
const sequelize = require("./db");
const UserModel = require("./models/User");
const PostModel = require("./models/Post");
const CommentModel = require("./models/Comment");
const CommentReplyModel = require("./models/CommentReply");
const NotificationModel = require("./models/Notification");
const ChatModel = require("./models/Chat");
const MessageModel = require("./models/Message");
// connect DB (shared connection, also used by the models)
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

const modelSync = async function dbSync() {
  try {
    const userTable = await UserModel.sync();
    const postTable = await PostModel.sync();
    const commentTable = await CommentModel.sync();
    const commentReplyTable = await CommentReplyModel.sync();
    const notificationTable = await NotificationModel.sync();
    const chatTable = await ChatModel.sync();
    const messageTable = await MessageModel.sync();
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
// chat route
const chatRouter = require("./routes/Chats");
app.use("/Chats", chatRouter);
//presigned route
const storageRouter = require("./routes/Storage");
app.use("/Storage", storageRouter);
// forgot password route
const forgotPasswordRouter = require("./routes/ForgetPassword");
app.use("/forgot-password", forgotPasswordRouter);
// google signup
const googleSignupRouter = require("./routes/GoogleAuth");
app.use("/auth", googleSignupRouter);

httpServer.listen(5000, console.log("server is running on 5000"));
