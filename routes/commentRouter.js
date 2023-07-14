const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/Comment.js')
const Issue = require('../models/Issue.js')
const User = require('../models/User.js')

// Get commnets for issue
commentRouter.get('/:issueId', async (req, res, next) => {
  try {
    const comments = await Comment.find({ issue: req.params.issueId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'user',
        select: 'username',
      });
    return res.status(200).send(comments);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

commentRouter.get('/', async (req, res, next) => {
    try {
      const comments = await Comment.find().sort({ createdAt: -1 }).populate({
        path: 'user',
        select: 'username',
      });
      return res.status(200).send(comments);
    } catch (err) {
      res.status(500);
      return next(err);
    }
  });

commentRouter.post('/:issueId', (req, res, next) => {
    req.body.user = req.auth._id
    req.body.issue = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

commentRouter.post(
    '/:issueId',
    async (req, res, next) => {
      try {
        const user = await User.findById(req.auth._id);
        req.body.user = user._id;
        req.body.issue = req.params.issueId;
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        await savedComment.populate({
          path: 'user',
          select: 'username profileImage',
        });
        return res.status(201).send(savedComment);
      } catch (err) {
        res.status(500);
        return next(err);
      }
    }
  );

commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId, user: req.auth._id},
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Comment deleted`)
        })
})

module.exports = commentRouter