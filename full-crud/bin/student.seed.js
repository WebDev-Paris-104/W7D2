require("dotenv/config");
require("./../config/dbConfig");
const Student = require("../models/Student.model");
const students = [
	{
		pseudo: "Bob",
		email: "bob@mail.com",
	},
	{
		pseudo: "John",
		email: "john@mail.com",
	},
	{
		pseudo: "Alice",
		email: "alice@mail.com",
	},
];

async function seed() {
	try {
		await Student.deleteMany();
		await Student.create(students);
		console.log("Created all the students!");
		process.exit();
	} catch (error) {
		console.log(error);
	}
}

seed();
