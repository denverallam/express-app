import { Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../models";
import { AuthService } from "../services";
import { validateEmail } from "../util";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, userName, firstName, lastName } = req.body;

        // Validate email format
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            res.status(400).json({ message: "Invalid email" });
            return
        }

        // Check if user already exists
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { userName }
                ]
            }
        });

        if (user) {
            res.status(400).json({ message: "Email alreay used" });
            return
        }

        // Encrypt password before saving
        const encryptedPassword = await AuthService.encryptPassword(password);
        const result = await User.create({ email, userName, password: encryptedPassword, firstName, lastName });

        // Omit password from response
        const { password: _, ...userWithoutPassword } = result.get();
        res.status(201).json({ user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ message: "An error occurred with registration: " + err.message });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return
        }

        const isPasswordValid = await AuthService.validatePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return
        }

        // Generate token
        const { password: _, ...userWithoutPassword } = user.get();
        const token = await AuthService.generateToken(userWithoutPassword);

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "An error occurred with login: " + err.message });
    }

}