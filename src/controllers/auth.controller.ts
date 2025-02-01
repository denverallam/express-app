import { Request, Response } from "express";
import { User } from "../models/user.model";
import { encryptPassword } from "../util/encrypt";
import { validateEmail, validatePassword } from "../util/validate";
import { Op } from "sequelize";

/**
 * 
 * @param {Requset} req
 * @param res
 * @returns 
 */
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
        const encryptedPassword = await encryptPassword(password);
        const result = await User.create({ email, userName, password: encryptedPassword, firstName, lastName });

        // Omit password from response
        const { password: _, ...userWithoutPassword } = result.dataValues;
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

        const isPasswordValid = await validatePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return
        }

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: "An error occurred with login: " + err.message });
    }

}