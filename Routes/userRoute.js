const express = require('express')
const { signUp } = require('../Controllers/userController')
const userRouter = express.Router()


userRouter.post('/signUp', signUp)



module.exports = userRouter