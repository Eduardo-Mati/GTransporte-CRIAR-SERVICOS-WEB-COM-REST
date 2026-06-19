import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {

	try {
		const { name, email, password } = req.body;
		
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await userModel.create({name, email, password: hashedPassword,});

		res.status(201).json({ message: "usuario registado com sucesso!", user: newUser });

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erro interno ao registar o usuario." });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		
		const user = await userModel.find({ email });
		if (!user || user.length === 0) {
			return res.status(404).json({ error: "Usuario não encontrado." });
		}
	
		
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res.status(401).json({ error: "Palavra-passe incorreta." });
		}

		
		const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.json({ message: "Login efetuado com sucesso!", token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erro interno ao efetuar login." });
	}
});

export default router;
