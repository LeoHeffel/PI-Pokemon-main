const express = require('express')
const { login, register } = require('../controllers/userController.js')

const userRouter = express.Router()


module.exports = userRouter
    .post('/login', login)
    .post('/register', register)
