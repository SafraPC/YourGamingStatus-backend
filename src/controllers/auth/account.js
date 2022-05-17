const LoginModel = require("../../models/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.json");

const generateToken = (properties) =>
	jwt.sign(properties, config.secret, {
		expiresIn: 86400,
	});

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email) {
			res.status(400).send({ message: "Email inválido!" });
			return;
		}
		const user = await LoginModel.findOne({ email: email }).select("+password");
		if (user) {
			if (await bcrypt.compare(password, user.password)) {
				const token = generateToken({ id: user.id });
				return res.send({ user: user, token: token });
			}
			res.status(400).send({ message: "Senha inválida!" });
			return;
		}
		res.status(400).send({ message: "Não foi encontrado nenhum usuário." });
	} catch (error) {
		res.status(500).json({ message: "Houve um erro interno!" });
	}
};

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).send({ error: "Insira corretamente os dados!" });
		}
		const createdUser = await LoginModel.create({ name, email, password });
		const token = generateToken({ id: createdUser.id });
		res.send({
			message: "Usuário criado com sucesso!",
			user: createdUser,
			token: token,
		});
	} catch (err) {
		res.status(500).json({ message: "Houve um erro interno!" });
	}
};

module.exports = { register, login };
