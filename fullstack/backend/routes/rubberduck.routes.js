const router = require("express").Router()
const RubberDuck = require("./../models/Rubberduck.model")
const Student = require("./../models/Student.model")
const uploader = require("./../config/cloudinary")
const isAuthenticated = require("./../middlewares/isAuthenticated")

router.get("/", async (req, res, next) => {
	try {
		const allRubberDucks = await RubberDuck.find()
		res.json(allRubberDucks)
	} catch (error) {
		next(error)
	}
})

// We receive the rubberduck infos and the name of the creator in the req.body
// router.post("/", async (req, res, next) => {
// 	try {
// 		console.log(req.body)
// 		const { name, picture, creator } = req.body
// 		const foundCreator = await Student.findOne({ pseudo: creator })
// 		if (!foundCreator) {
// 			return res
// 				.status(400)
// 				.json({ message: `Could not find any user with the name: ${creator}` })
// 		}
// 		const createdDuck = await RubberDuck.create({
// 			name,
// 			picture,
// 			creator: foundCreator._id,
// 		})
// 		res.status(201).json(createdDuck)
// 	} catch (error) {
// 		next(error)
// 	}
// })

// We receive the infos of the duck in the req.body, and the id in the params.

router.post("/", uploader.single("picture"), async (req, res, next) => {
	try {
		console.log(req.body)
		console.log(req.file)
		console.log(req.user)
		// const foundUser = await Student.findById(req.params.creatorId)
		// if (!foundUser) {
		// 	return res.status(400).json({
		// 		message: `Could not find any user with the id: ${req.params.creatorId}`,
		// 	})
		// }

		let pictureUrl
		if (req.file) {
			pictureUrl = req.file.path
		}

		const createdDuck = await RubberDuck.create({
			name: req.body.name,
			picture: pictureUrl,
			creator: req.user._id,
		})

		res.status(201).json(createdDuck)
	} catch (error) {
		next(error)
	}
})

// Get one

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const oneDuck = await RubberDuck.findById(id)
			.populate("creator", "pseudo")
			.populate("usedBy")
		res.json(oneDuck)
	} catch (error) {
		next(error)
	}
})

// Update duck

router.patch("/:id", uploader.single("picture"), async (req, res, next) => {
	try {
		const { id } = req.params
		const { name } = req.body

		let newPicture
		if (req.file) {
			newPicture = req.file.path
		}
		console.log("in the route")
		console.log(req.body, req.params)
		const updatedDuck = await RubberDuck.findByIdAndUpdate(
			id,
			{ name, picture: newPicture },
			{ new: true }
		)
		console.log(updatedDuck)
		res.json(updatedDuck)
	} catch (error) {
		next(error)
	}
})

// Add some userId in the usedBy field
router.patch("/:duckId/:studentId", async (req, res, next) => {
	try {
		const { duckId, studentId } = req.params
		const updatedDuck = await RubberDuck.findByIdAndUpdate(
			duckId,
			{
				$push: { usedBy: studentId },
			},
			{ new: true }
		)
		res.json(updatedDuck)
	} catch (error) {
		next(error)
	}
})

module.exports = router
