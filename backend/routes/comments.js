const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Comment = require('../models/Comment');
const verifyToken = require('../verifyToken')

//create 
router.post("/write",verifyToken, async(req,res)=>{
    try{
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save()

        res.status(200).json({
            savedComment,
            "msg":"comment createddd"
        })

    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE COMMENT 
router.put("/:id", verifyToken, async(req,res)=>{
    try{     
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json({
            updatedComment,
            "msg":"comment createddd"
        })
    }
    catch(err){
        res.status(500).json(err)
    }
})

//delete comment
router.delete('/:id', verifyToken, async(req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({
            "msg":"comment deleted"
        })

    }catch(err){
        res.status(500).json(err);
    }
})
    

// Get Post Comments
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        if (comments.length === 0) {
            res.status(404).json({ "msg": "No comments found for this post" });
        } else {
            res.status(200).json(comments);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;