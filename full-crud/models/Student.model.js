const { model, Schema } = require("mongoose")

const studentSchema = new Schema({
	username: {
		required: true,
		unique: true,
		trim: true,
		maxLength: 50,
		type: String,
	},
	password: {
		type: String,
		select: false,
	},
	status: {
		type: String,
		enum: ["student", "alumni", "admin"],
		default: "student",
	},
})

const Student = model("Student", studentSchema)

module.exports = Student
