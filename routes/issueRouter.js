const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/Issue.js')

// Get All Issues
issueRouter.get('/', (req, res, next) => {
    Issue.find().populate('user').exec((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

issueRouter.get('/public/issue', (req, res, next) => {
    Issue.find().populate('user').exec((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// Get issues by user Id 
issueRouter.get('/user', (req, res, next) => {
    Issue.find({user: req.auth._id}).populate('user').exec((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// Add new Issue
issueRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// Delete Issue
issueRouter.delete('/:issueId', (req, res, next) => {
    Issue.findOneAndDelete(
        {_id: req.params.issueId, user: req.auth._id},
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Deleted issue: ${deletedIssue.title}`)
        }
    )
})

// Update Issue
issueRouter.put('/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

// Up Vote
issueRouter.put('/upVote/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId},
        {$addToSet: {upVotes: req.auth._id}, 
            $pull: {downVotes: req.auth._id}
        },
        {new: true},
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

// Down Vote
issueRouter.put('/downVote/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId},
        {$addToSet: {downVotes: req.auth._id}, 
            $pull : {upVotes: req.auth._id}
        },
        {new: true},
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

module.exports = issueRouter