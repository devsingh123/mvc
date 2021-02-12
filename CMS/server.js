const express = require("express")
const app = express()
var methodOverride = require("method-override")
const path = require("path")
const con = require("./config/db.js")

// Using pug template engine
//app.set("views", path.join(__dirname, "views"))
//app.set("view engine", "ejs")

// connecting route to database
app.use(function(req, res, next) {
  req.con = con
  next()
})

// parsing body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// include router
const biodataRouter = require("./routes/biodataRouter")
const userRouter = require("./routes/userRouter")
//const pageRouter = require("./routes/pageRouter")

// routing
app.use("/biodata", biodataRouter)
app.use("/user", userRouter)
//app.use("/page", pageRouter)

// starting server
app.listen(3001, function() {
  console.log("server listening on port 3001")
})
