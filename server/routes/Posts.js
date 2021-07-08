const express = require('express');
const router= express.Router();
const requireLogin= require('../middlewares/requireLogin')
const Post= require('../models/Post');
const User= require('../models/User')
const Comment= require('../models/Comment')
const CommentReply= require('../models/CommentReply')


// routes
// get all posts
router.get('/',requireLogin,(req,res)=>{
    Post.findAll({
        include:[{model:User}, {model:Comment,
        include:{model:CommentReply}}] 
    })
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
// get all posts by country
router.get('/:province',requireLogin,(req,res)=>{
    Post.findAll({
        where:{province: req.params.province},
        include:[{model:User}, {model:Comment,
        include:{model:CommentReply}}] 
    })
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
// get a single post with Id route
router.get('/:postId',requireLogin,(req,res)=>{
    Post.findOne({
        where:{postId:req.params.postId},
        include:[{model:User}, {model:Comment,
        include:{model:CommentReply}}] 
    })
    .then(post=>{
        res.json({post})
    })
    .catch(err=>{
        console.log(err)
    })
})

// create a post route
router.post('/',requireLogin, (req,res)=>{
    const {country, province, content, video, }= req.body
    if(!country || !province || !content || !video){
       return res.status(422).json({error:'please add all the fields'})
    }
    req.user.password= undefined;
    const post = Post.create({
        country,
        province,
        content,
        video,
        userId: req.user.userId
    })
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
// add comments to a post with postId
router.post('/:postId/comments',requireLogin, (req,res)=>{
    const {text}= req.body
    if(!text){
       return res.status(422).json({error:'please add comment'})
    }
    const comment = Comment.create({
        text,
        userId: req.user.userId,
        postId: req.params.postId
    })
    .then(result=>{
        res.json({comment:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
// add commentreply to a comment in a post
router.post('/:postId/comments/:commentId/commentReply',requireLogin, (req,res)=>{
    const {text}= req.body
    if(!text){
       return res.status(422).json({error:'please add comment'})
    }
    const commentReply = CommentReply.create({
        text,
        userId: req.user.userId,
        postId: req.params.postId,
        commentId: req.params.commentId
    })
    .then(result=>{
        res.json({commentReply:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports= router;