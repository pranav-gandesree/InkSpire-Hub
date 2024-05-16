const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');
const verifyToken = require('../verifyToken')

//create 
router.post("/write",verifyToken, async(req,res)=>{
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save()

        res.status(200).json({
            savedPost,
            "msg":"post createddd"
        })

    }catch(err){
        res.status(500).json(err);
    }
})

//update post
router.put('/:id',verifyToken, async(req,res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json({
            updatedPost,
            "msg":"post updated"
        })

    }catch(err){
        res.status(500).json(err);
    }
})

//delete post
router.delete('/:id', verifyToken, async(req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            "msg":"post deleted"
        })

    }catch(err){
        res.status(500).json(err);
    }
})
    
//get post
router.get('/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            post,
            "msg":"post"
        })

    }catch(err){
        res.status(500).json(err);
    }
})


//GET  ALL POSTS
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// get user posts
router.get('/user/:userId', async(req,res)=>{
    try{
        const userPosts = await Post.find({userId: req.params.userId});
        res.status(200).json({
            userPosts,
            "msg":"user posts"
        })

    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;