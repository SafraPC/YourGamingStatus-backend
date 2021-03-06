require("dotenv/config");
const express = require("express");
const cors = require("cors");
const connection = require("./database/index");
const app = express();
const router = require("./routes/router");

const initServer = async () => {
	app.use(express.json());
	app.use(cors());
	app.use(express.urlencoded({ extended: false }));
	await connection();
	app.use(router);
	app.use((_, res) => {
		res.status(404).send({ message: "Rota não Encontrada!" });
	});
	app.listen(process.env.PORT || 4000, () => {
		console.log("Server is Running on Port 4000");
	});
};

initServer();
