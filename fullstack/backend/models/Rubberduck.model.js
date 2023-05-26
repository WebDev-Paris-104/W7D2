const { model, Schema } = require("mongoose")

const rubberDuckSchema = new Schema(
	{
		name: {
			required: true,
			unique: true,
			trim: true,
			maxLength: 50,
			type: String,

			// set: (value) => {
			// 	return value[0].toUpperCase() + value.slice(1)
			// },
		},
		picture: {
			type: String,
			default:
				"https://amsterdamduckstore.com/wp-content/uploads/2023/02/Incredible-Rubber-Duck-front-Holdy-400x400.jpg",
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},
		usedBy: [
			{
				type: Schema.Types.ObjectId,
				ref: "Student",
			},
		],
	},
	{ timestamps: true }
)

const RubberDuck = model("Rubberduck", rubberDuckSchema)

module.exports = RubberDuck
