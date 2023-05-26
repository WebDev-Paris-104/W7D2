// require('dotenv/config')
require("dotenv").config()
// Connect to the database
require("./config/dbConfig")
// We need express
const express = require("express")
const cors = require("cors")
// Need the app
const app = express()
// Configuration of the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Authorize everyone
// app.use(cors())
// Authorize just our frontend
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
	})
)

/**
 * Quick example of middlewares
 */
// app.use(logger);

// app.get("/", (req, res, next) => {
// 	res.json(req.cat);
// });

// app.get("/test", modifytheRequest, (req, res, next) => {
// 	res.json(req.cat);
// });

// Here we are importing the index router
// All the request are handled in the subsequent routes
app.use("/api", require("./routes/index.routes"))
/**
 *
 * ! Traffic handler
 *
 * ? HEALTHCHECK
 * GET /api
 *
 * ? STUDENT ROUTES
 * GET /api/student  List of all students
 * GET /api/student/:id   One student
 * POST /api/student   Create a student
 * PATCH /api/student/:id   Update a student
 * DELETE /api/student/:id   Delete a student
 *
 * ? RUBBERDUCK ROUTES
 * GET /api/rubberduck
 * GET /api/rubberduck/:id
 * POST /api/rubberduck
 * PATCH /api/rubberduck/:id
 * DELETE /api/rubberduck/:id
 *
 * ? CATCH EM ALL (404)
 * ANY  respond with a 404
 *
 * ? Error Handler
 */

app.use("*", (req, res, next) => {
	res.json({ message: "That's a 404 right here..." })
})

app.use((err, req, res, next) => {
	console.log(err)
	if (err.name === "CastError") {
		return res.status(400).json({
			message: "Cast error",
			details: "Make sure you are sending correct informations",
		})
	}

	if (err.name === "TokenExpiredError") {
		return res.status(401).json({ message: "Token expired" })
	}
	res.status(500).json({ error: err, message: err.message })
})

// function modifytheRequest(req, res, next) {
// 	req.cat = { name: "Illiu" };
// 	next();
// }

// function logger(req, res, next) {
// 	console.log(`Making a request on ${req.path}`);
// 	next();
// }

app.listen(process.env.PORT, () =>
	console.log(`Server running on http://localhost:${process.env.PORT}`)
)
