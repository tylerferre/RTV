const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVotes:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
    
})

module.exports = mongoose.model('Issue', issueSchema)