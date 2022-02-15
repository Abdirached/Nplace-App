const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const CommentReply = require("../models/CommentReply");

// routes
// get all posts
router.get("/", requireLogin, (req, res) => {
  Post.findAll({
    include: [
      { model: User },
      { model: Comment, include: { model: CommentReply } },
    ],
  })
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get all posts by province
router.get("/province/:provincename", requireLogin, (req, res) => {
  Post.findAll({
    where: { province: req.params.provincename },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
      { model: Comment, include: { model: CommentReply } },
    ],
  })
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get all posts by country
router.get("/country/:countryname", requireLogin, (req, res) => {
  Post.findAll({
    where: { country: req.params.countryname },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: Comment,
        include: [
          {
            model: CommentReply,
            include: {
              model: User,
              attributes: {
                exclude: ["password", "email", "phonenumber"],
              },
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "email", "phonenumber"],
            },
          },
        ],
      },
    ],
  })
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get a single post with Id route
router.get("/:postId", requireLogin, (req, res) => {
  Post.findOne({
    where: { postId: req.params.postId },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: Comment,
        include: [
          {
            model: CommentReply,
            include: {
              model: User,
              attributes: {
                exclude: ["password", "email", "phonenumber"],
              },
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "email", "phonenumber"],
            },
          },
        ],
      },
    ],
  })
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});
// update singlepost
router.put("/:postId/editpost", requireLogin, (req, res) => {
  const { country, province, content, video } = req.body;
  if (!country || !province || !content || !video) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  req.user.password = undefined;
  const post = Post.update(
    {
      country,
      province,
      content,
      video,
      userId: req.user.userId,
    },
    { where: { postId: req.params.postId } }
  )
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
// delete single post route
router.delete("/:postId/deletepost", requireLogin, (req, res) => {
  const post = Post.destroy({ where: { postId: req.params.postId } })
    .then((result) => {
      // return deleted result if available
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
// create a post route
router.post("/", requireLogin, (req, res) => {
  const { country, province, content, video } = req.body;
  if (!country || !province || !content || !video) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  req.user.password = undefined;
  const post = Post.create({
    country,
    province,
    content,
    video,
    userId: req.user.userId,
  })
    .then((result) => {
      Post.findOne({
        where: { postId: result.postId },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "email", "phonenumber"],
            },
          },
        ],
      })
        .then((response) => {
          res.json({ post: response });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
// add comments to a post with postId
router.post("/:postId/comments", requireLogin, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(422).json({ error: "please add comment" });
  }
  const comment = Comment.create({
    text,
    userId: req.user.userId,
    postId: req.params.postId,
  })
    .then((result) => {
      Comment.findOne({
        where: { commentId: result.commentId },
        include: [
          {
            model: CommentReply,
            include: {
              model: User,
              attributes: {
                exclude: ["password", "email", "phonenumber"],
              },
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "email", "phonenumber"],
            },
          },
        ],
      }).then((comment) => {
        res.json({ comment });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// edit comment in a post
router.put("/:postId/comments/:commentId", requireLogin, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(422).json({ error: "please add comment" });
  }
  const comment = Comment.update(
    {
      text,
      userId: req.user.userId,
      postId: req.params.postId,
    },
    { where: { commentId: req.params.commentId }, returning: true }
  )
    .then((result) => {
      Comment.findOne({
        where: { commentId: req.params.commentId },
        include: [
          {
            model: CommentReply,
            include: {
              model: User,
              attributes: {
                exclude: ["password", "email", "phonenumber"],
              },
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "email", "phonenumber"],
            },
          },
        ],
      }).then((comment) => {
        res.json({ comment });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// delete comment in a post
router.delete(
  "/:postId/comments/:commentId/deletecomment",
  requireLogin,
  (req, res) => {
    const comment = Comment.destroy({
      where: { commentId: req.params.commentId },
      returning: true,
    })
      .then((result) => {
        res.json({ comment: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
// add commentreply to a comment in a post
router.post(
  "/:postId/comments/:commentId/commentReply",
  requireLogin,
  (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(422).json({ error: "please add comment" });
    }
    const commentReply = CommentReply.create({
      text,
      userId: req.user.userId,
      postId: req.params.postId,
      commentId: req.params.commentId,
    })
      .then((result) => {
        CommentReply.findOne({
          where: { commentReplyId: result.commentReplyId },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password", "email", "phonenumber"],
              },
            },
          ],
        }).then((commentReply) => {
          res.json({ commentReply });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
// edit commentReply
router.put(
  "/:postId/comments/:commentId/commentReply/:commentReplyId",
  requireLogin,
  (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(422).json({ error: "please add commentReply" });
    }
    const commentReply = CommentReply.update(
      {
        text,
        userId: req.user.userId,
        postId: req.params.postId,
        commentId: req.params.commentId,
      },
      { where: { commentReplyId: req.params.commentReplyId }, returning: true }
    )
      .then((result) => {
        CommentReply.findOne({
          where: { commentReplyId: req.params.commentReplyId },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password", "email", "phonenumber"],
              },
            },
          ],
        }).then((commentReply) => {
          res.json({ commentReply });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
// delete commentreply in a comment
router.delete(
  "/:postId/comments/:commentId/commentReply/:commentReplyId/deleteCommentReply",
  requireLogin,
  (req, res) => {
    const commentReply = CommentReply.destroy({
      where: { commentReplyId: req.params.commentReplyId },
      returning: true,
    })
      .then((result) => {
        res.json({ commentReply: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
module.exports = router;
