const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const UserModel = require("../models/User");
const NotificationModel = require("../models/Notification");

// create notification route
router.post("/", requireLogin, (req, res) => {
  const { recipientId, notifiableId, action, notifiableObject } = req.body;
  const post = NotificationModel.create({
    action,
    recipientId,
    actorId: req.user.userId,
    notifiableId,
    notifiableObject,
    userId: req.user.userId,
  })
    .then((result) => {
      res.json({ Notification: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get notifications for currentuser route
router.get("/:userId", requireLogin, (req, res) => {
  NotificationModel.findAll({
    where: { recipientId: req.params.userId },
    include: [
      {
        model: UserModel,
        attributes: {
          exclude: ["password", "email", "phonenumber"],
        },
      },
    ],
  })
    .then((notification) => {
      res.json({ notification });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
