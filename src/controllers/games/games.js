const GamesModel = require("../../models/userGames");

const registerGames = async (req, res) => {
	try {
		const { name, gender, qtdAchievements, qtdHoursPlayed, rate } = req.body;
		const createdUser = await GamesModel.create({
			userId: req.id,
			name,
			gender,
			qtdAchievements,
			qtdHoursPlayed,
			rate,
		});
		if (createdUser) {
			return res.send({
				message: "Algo deu errado.",
			});
		}
		return res.status(400).send({
			message: "deu merda mermao",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Houve um erro interno!" });
	}
};

const findGames = async (req, res) => {
	try {
		const games = await GamesModel.find({ userId: req.id });
		if (games) {
			return res.send(games);
		}
		return res.status(400).send({ message: "Não foi encontado nenhum jogo!" });
	} catch (err) {
		res.status(500).send({ message: "Houve um erro interno!" });
	}
};

module.exports = { registerGames, findGames };
