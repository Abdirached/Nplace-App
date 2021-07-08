const express = require('express');
const router= express.Router();
const requireLogin= require('../middlewares/requireLogin')
const Post= require('../models/Post');
const User= require('../models/User')
const Comment= require('../models/Comment')
const CommentReply= require('../models/CommentReply')
// get user and user-posts
router.get('/:userId',requireLogin,(req,res)=>{
    User.findOne({where:{userId: req.params.userId}, attributes: ['userId', 'firstName','lastName','avatar','createdAt', 'updatedAt']})
    .then(user=>{
        Post.findAll({where:{userId: req.params.userId},include:[{model:Comment,
            include:{model:CommentReply}}]})
            .then(posts=>{
                res.json({user,posts})
            })
            .catch(err=>{
                console.log(err)
            })
    }).catch(error=>{
        return res.status(404).json({error:'user not found'})
    })
})
module.exports= router;