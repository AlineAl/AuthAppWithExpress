import { Request, Response } from "express";
import checkIfUserExists from "../utils/checkIfUserExists";
import insertUser from "../utils/insertUser";
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

const generateToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}


const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        if(!name || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs ne sont pas remplis' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = { name, email, password: hashedPassword }
        const userExists = await checkIfUserExists(user.email);

        if(userExists) {
            return res.status(400).json({ message: "Cet utilisateur existe déjà" })
        }

        await insertUser(user.name, user.email, user.password);
        return res.status(201).json({ message: "l'utilisateur a bien été créé" })

    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error'})
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if(!email || !password) {
            return res.status(400).json({ message: "Tous les champs doivent être remplis pour vous authentifier" })
        }
        const userExists = await checkIfUserExists(email);
        if(!userExists) {
            return res.status(400).json({ message: "Cet email n'existe pas" })
        }
        const user = userExists as User;
        const passwordMatched = await bcrypt.compare(password, user.password)

        if(!passwordMatched) {
            return res.status(400).json({ message: "Le mot de passe est incorrect" })
        }
        const token = generateToken(user.id);
        return res.status(200).json({ token });

    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error'})
    }
}

export { register, login };

