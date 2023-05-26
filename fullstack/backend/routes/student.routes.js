const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const Student = require("./../models/Student.model")
const { isValidObjectId } = require("mongoose")
const isAdmin = require("./../middlewares/isAdmin")
/**
 * ! This router is prefixed with /student
 */
// router.get("/:id", (req, res, next) => {
// 	console.log(req.params, req.path, req.originalUrl);
// 	res.send("student route");
// });

// Let's crud it

//! Create

router.post("/", async (req, res, next) => {
	try {
		// req.body contains the data sent via the request
		console.log(req.body)
		const { pseudonyme, email, status } = req.body
		console.log(pseudonyme, email, status)
		// res.send("youp");
		// return;
		if (!pseudonyme || !email) {
			return res.status(400).json({ message: "Missing some informations" })
		}

		const samePseudo = await Student.findOne({ pseudo: pseudonyme })
		if (samePseudo) {
			return res
				.status(400)
				.json({ message: `Pseudo: ${pseudonyme} is not available` })
		}

		const createdStudent = await Student.create({
			pseudo: pseudonyme,
			email,
			status,
		})
		res.status(201).json({
			message: "We've just created something!",
			student: createdStudent,
		})
	} catch (error) {
		next(error)
	}
})

//! Read

router.get("/", getAllStudents)

async function getAllStudents(req, res, next) {
	try {
		// throw Error("hoho..");
		const allStudents = await Student.find()
		res.json(allStudents)
	} catch (error) {
		next(error)
	}
}

// ! Read one
// Preventing from entering a route if we don't have something similar to an ObjectId:
// /:id([a-f0-9]{24})
router.get("/:id", async (req, res, next) => {
	// if (!isValidObjectId(req.params.id)) {
	// 	console.log("Not happening?");
	// 	return res
	// 		.status(400)
	// 		.json({ message: `The id ${req.params.id} is not valid` });
	// }
	try {
		const oneStudent = await Student.findById(req.params.id)
		res.json(oneStudent)
	} catch (error) {
		next(error)
	}
})

//todo Get gud
//? What is that?
//* Fancy

//! Delete
router.delete("/:id", async (req, res, next) => {
	try {
		const deletedThing = await Student.findByIdAndDelete(req.params.id)
		console.log(deletedThing)
		if (!deletedThing) {
			return res.json({
				message: `Could not match any document with the id ${req.params.id}`,
			})
		}
		res.json({ message: `Deleted document with id ${req.params.id}` })
	} catch (bryan) {
		next(bryan)
	}
})

//! Update

router.patch("/", isAuthenticated, async (req, res, next) => {
	const { id } = req.params
	const { email, status, pseudonyme } = req.body
	try {
		const samePseudo = await Student.findOne({ pseudo: pseudonyme })
		const pseudoAgain = await Student.find({ pseudo: pseudonyme })
		console.log("find:", pseudoAgain, "findOne:", samePseudo)
		if (samePseudo) {
			return res
				.status(400)
				.json({ message: `Pseudo: ${pseudonyme} is not available` })
		}
		const updatedStudent = await Student.findByIdAndUpdate(
			req.user.id,
			{ email, status, pseudo: pseudonyme },
			{ new: true }
		)
		res.json(updatedStudent)
	} catch (error) {
		next(error)
	}
})

// the path is: PATCH /api/student/status/:id
router.patch(
	"/status/:id",
	isAuthenticated,
	isAdmin,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { status } = req.body
			const updatedStudent = await Student.findByIdAndUpdate(
				id,
				{ status },
				{ new: true }
			)
			res.json(updatedStudent)
		} catch (error) {
			next(error)
		}
	}
)

module.exports = router
