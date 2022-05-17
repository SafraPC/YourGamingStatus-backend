const mongoose = require("mongoose");

const connect = async () => {
	await mongoose.connect(process.env.MONGO_URL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("Database Connected");
};
module.exports = connect;
