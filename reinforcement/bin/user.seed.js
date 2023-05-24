require("dotenv").config({ path: "./../.env" })
require("./../db/index")
const User = require("./../models/User.model")

const users = [
	{
		name: "Antoine",
	},
	{
		name: "Sonia",
	},
	{
		name: "Indra",
	},
	{
		name: "Maiana",
	},
	{
		name: "Fabien",
	},
	{
		name: "Romain",
	},
	{
		name: "Bryan",
	},
	{
		name: "Toheeb",
	},
]
seed()

async function seed() {
	try {
		await User.deleteMany()
		const createdUsers = await User.create(users)
		console.log(createdUsers)
		console.log(`Wowo, you created ${createdUsers.length} users ! Big kudos.`)
		process.exit()
	} catch (error) {
		console.log(error)
	}
}
