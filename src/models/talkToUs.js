const mongoose = require("mongoose");

const TalkToUsSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("TalkToUs", TalkToUsSchema);
module.exports = User;
