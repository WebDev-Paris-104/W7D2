const router = require("express").Router()
const User = require("./../models/Student.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const salt = 10
const isAuthenticated = require("./../middlewares/isAuthenticated")

router.post("/signup", async (req, res, next) => {
	try {
		// * Get the informations from the user input
		const { username, password } = req.body
		// * Check if the user already exist
		const foundUser = await User.findOne({ username })
		if (foundUser) {
			return res.status(400).json({ message: "User already exist." })
		}
		// * Password safety
		if (password.length < 6) {
			return res.status(400).json({ message: "Unsafe password" })
		}

		// * Generate the salt
		const generatedSalt = await bcrypt.genSalt(salt)
		// * Generate the hash for that password
		const hashedPass = await bcrypt.hash(password, generatedSalt)
		// * Should be safe to create the user.

		const createdUser = await User.create({
			username,
			//! Please don't forget me. 🥹
			password: hashedPass,
		})
		console.log(createdUser)
		res
			.status(201)
			.json({ message: "Welcome' aboard young pirate!", createdUser })
	} catch (error) {
		next(error)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const foundUser = await User.findOne({ username }).select(
			"password username"
		)
		if (!foundUser) {
			return res.status(400).json({ message: "Wrong credentials" })
		}

		const samePassword = await bcrypt.compare(password, foundUser.password)
		if (!samePassword) {
			return res.status(400).json({ message: "Wrong credentials" })
		}
		//! This is where we setup what is going to be inside of the token
		const payload = { username: foundUser.username, _id: foundUser._id }
		const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
			algorithm: "HS256",
			expiresIn: "1h",
		})

		res.json({ token: token })
	} catch (error) {
		next(error)
	}
})

router.get("/me", isAuthenticated, async (req, res, next) => {
	res.json(req.user)
})

module.exports = router
