const express = require('express')
const { signup, login, getUser, logoutUser } = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')
const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/",verifyToken,getUser)
authRouter.get("/logout",logoutUser)

module.exports = authRouter
