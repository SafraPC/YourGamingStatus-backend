const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
	},
	{
		timestamps: true,
	}
);
UserSchema.pre("save", function (next) {
	const user = this;
	if (user.isModified("password")) {
		bcrypt.genSalt(10, function (err, salt) {
			if (!err) {
				bcrypt.hash(user.password, salt, function (err, hash) {
					if (!err) {
						user.password = hash;
						next();
					}
				});
			}
		});
	}
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
