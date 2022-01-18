const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const UserModel = require("../models/User");
const ChatModel = require("../models/Chat");
const MessageModel = require("../models/Message");

// get chats for currentuser route
router.get("/:currentUserId", requireLogin, (req, res) => {
  const chat = ChatModel.findAll({
    where: {
      [Op.or]: [
        { ownerOne: req.params.currentUserId },
        { ownerTwo: req.params.currentUserId },
      ],
    },
    include: [
      {
        model: MessageModel,
        include: {
          model: UserModel,
          as: "Receiver",
          attributes: {
            exclude: ["password", "email", "phonenumber"],
          },
        },
      },
    ],
  })
    .then((chats) => {
      res.json({ chats });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get single chat with chatId
router.get("/chat/:chatId", requireLogin, (req, res) => {
  const chat = ChatModel.findOne({
    where: {
      chatId: req.params.chatId,
    },
    include: [
      {
        model: MessageModel,
        include: {
          model: UserModel,
          as: "Receiver",
          attributes: {
            exclude: ["password", "email", "phonenumber"],
          },
        },
      },
    ],
  })
    .then((chat) => {
      res.json({ chat });
    })
    .catch((err) => {
      console.log(err);
    });
});
// add chat
router.post("/:firstUserId/:secondUserId", requireLogin, (req, res) => {
  const chat = ChatModel.findOrCreate({
    where: {
      ownerOne: { [Op.or]: [req.params.firstUserId, req.params.secondUserId] },
      ownerTwo: { [Op.or]: [req.params.firstUserId, req.params.secondUserId] },
    },
    defaults: {
      ownerOne: req.params.firstUserId,
      ownerTwo: req.params.secondUserId,
    },
  })
    .then((chat) => {
      if (chat) {
        return res.json(chat);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});
// messages route
// add message to specific chat
router.post("/chat/:chatId/messages", requireLogin, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(422).json({ error: "please add text" });
  }
  MessageModel.create({
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    text,
    chatId: req.params.chatId,
  })
    .then((message) => {
      res.json({ message });
    })
    .catch((err) => {
      res.send(err);
    });
});
// update chat read status
router.put("/chat/:chatId", requireLogin, (req, res) => {
  const { isRead } = req.body;
  ChatModel.update(
    {
      isRead,
    },
    { where: { chatId: req.params.chatId }, returning: true }
  )
    .then((chat) => {
      res.json({ chat });
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;
