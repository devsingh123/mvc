const express = require("express")
const router = express.Router()
const userController = require("../controller/pageController")

/* JWT Token Module */
var jwt = require('jsonwebtoken');
var key = require('../key');
var key = require('../key');

// Show Page
router.post("/:id", pageController.index)

// Create Page
router.post("/create", pageController.create)

// Update Page
router.post("/update/:pid", pageController.update)

// Remove Page
router.get("/remove/:pid", pageController.remove)

module.exports = router
