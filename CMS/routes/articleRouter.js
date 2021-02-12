const express = require("express")
const router = express.Router()
const articlesController = require("../controller/articlesController")

router.post("/", articlesController.index)

module.exports = router
