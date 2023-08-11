const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')
const path = require('path')
uri = process.env.URI
process.env.SEVRET

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))

mongoose.connect(
    uri,
    () => console.log('Connected to DB')
)

app.use('/proxy/auth', require('./routes/authRouter.js'))
app.use('/proxy/api', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/proxy/api/issue', require('./routes/issueRouter.js'))
app.use('/proxy/api/comment', require('./routes/commentRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.listen(9000, () => {
    console.log('Server is running on port 9000')
})

