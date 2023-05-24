const router = require("express").Router()
const User = require("./../models/User.model.js")

/**
 * Get all
 */
router.get("/", async (req, res, next) => {
	const { name } = req.query
	try {
		console.log(req.query)
		if (name) {
			const filteredUsers = await User.find({ name: RegExp(name, "i") })
			return res.json(filteredUsers)
		}
		const allUsers = await User.find()
		res.json(allUsers)
	} catch (error) {
		next(error)
	}
})

/**
 * Get one
 */
router.get("/:userId", async (req, res, next) => {
	try {
		console.log(req.params)
		const myId = req.params.userId
		// const {userId} = req.params
		const foundUser = await User.findById(myId)
		res.json(foundUser)
	} catch (error) {
		next(error)
	}
})

router.post("/", async (req, res, next) => {
	try {
		console.log(req.body)
		// const nameToCreate = req.body.name
		const { name } = req.body
		const newUser = await User.create({ name: name })
		res.json(newUser)
	} catch (error) {
		next(error)
	}
})

router.patch("/:id", async (req, res, next) => {
	try {
		console.log(req.body, req.params)
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		res.json(updatedUser)
	} catch (error) {
		next(error)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		console.log(req.params)
		const deletedUser = await User.findByIdAndDelete(req.params.id)
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

module.exports = router
