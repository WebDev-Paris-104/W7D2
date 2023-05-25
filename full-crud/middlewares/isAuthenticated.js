const jwt = require("jsonwebtoken")
const User = require("./../models/Student.model")

async function isAuthenticated(req, res, next) {
	try {
		console.log(req.headers)
		let token = req.headers.authorization
		if (!token) {
			return res.status(400).json({ message: "No token found" })
		}
		token = token.replace("Bearer ", "")
		console.log(token)
		const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
			algorithm: "HS256",
		})
		const user = await User.findById(payload._id)
		req.user = user
		// Everything is good, let's move to the next route
		next()
		// res.send(user)
	} catch (error) {
		next(error)
	}
}

module.exports = isAuthenticated
