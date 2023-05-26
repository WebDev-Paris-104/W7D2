const isAuthenticated = require("../middlewares/isAuthenticated.js")
const router = require("express").Router()
// const express = require('express')
// const router = express.Router()
// const {Router} = require('express')
// const router = Router()

/**
 * We want to handle where the request wants to go,
 * - Thumb rule:
 *    - Create a router for every model that you do have.
 */
router.get("/", (req, res) => {
	res.json("We are live.")
})

// Prefixing routes
const studentRoutes = require("./student.routes.js")
router.use("/student", studentRoutes)
router.use("/auth", require("./auth.routes.js"))

router.use(isAuthenticated)
//! We need to be logged in to access this part of the website
router.use("/rubberduck", require("./rubberduck.routes.js"))

// We always need to export the router
module.exports = router
