

const express = require("express")
const userAuth = require("../middleware/userAuth.js")
const {register, login, logout, isAuthenticated} = require("../Controller/AuthController.js")

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/is-auth', userAuth, isAuthenticated);

module.exports = authRouter