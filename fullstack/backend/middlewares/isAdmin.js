async function isAdmin(req, res, next) {
	try {
		console.log(req.user)
		// res.send("working in isAdmin middleware")
		console.log(req)
		if (req.user.status === "admin") {
			return next()
		}
		return res.status(401).json({ message: "Unauthorized" })
	} catch (error) {
		next(error)
	}
}
module.exports = isAdmin
