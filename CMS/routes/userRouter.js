const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

// User Registration
router.post("/register", userController.index)

// User Login
router.post("/login", userController.login)

// User Logout
router.get("/logout", userController.logout)

module.exports = router
