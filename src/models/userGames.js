const mongoose = require("mongoose");

const UserGamesSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		qtdAchievements: {
			type: Number,
			required: true,
		},
		qtdHoursPlayed: {
			type: Number,
			required: true,
		},
		rate: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("UserGames", UserGamesSchema);
module.exports = User;
