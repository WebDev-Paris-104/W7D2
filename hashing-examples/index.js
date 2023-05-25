const bcrypt = require("bcryptjs")
const password = "123456"
const salt = 10
const maiana = console
maiana.time("hash")
genHash(password).then(async (hashed) => {
	maiana.log(hashed)
	//                                     user info   stored in db
	const isItTheSame = await bcrypt.compare("123456", hashed)
	maiana.log(isItTheSame)
})

async function genHash(pass) {
	const generatedSalt = await bcrypt.genSalt(salt)
	const generatedHash = await bcrypt.hash(pass, generatedSalt)

	return generatedHash
}

/**
 *
 * Sign up:
 *
 * get the information (username, password, email) via req.body
 *
 * In the sign up route
 * Does the user already exist ?
 * Is the password safe ?
 * Hash that pass
 * Create the user (remember to replace the password the user provided
 * by the hash we generated)
 * User was created :)
 *
 * Log in:
 *
 * Get the infos sent by the user
 * Does the user exist ?
 * If the user exist, compare the password sent with the hash in the db
 * If there is a match everything is good
 * Send the user a token which he will be able to send back to authentify that he is who he say he is
 *
 */
