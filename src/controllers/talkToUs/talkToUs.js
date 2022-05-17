const TalkToUsModel = require("../../models/talkToUs");

const registerCall = async (req, res) => {
	try {
		const { description } = req.body;
		const createdDescription = await TalkToUsModel.create({
			userId: req.id,
			description,
		});
		if (createdDescription) {
			return res.send({
				message: "Descrição cadastrada com sucesso!",
			});
		}
		return res.status(400).send({
			message: "Algo deu errado.",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Houve um erro interno!" });
	}
};

module.exports = { registerCall };
