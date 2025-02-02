import { genSalt, compare } from "bcrypt";
import { hash } from "crypto";
import { User } from "../models";
import jwt from "jsonwebtoken";


export class AuthService {
    private static saltRounds = Number(process.env.SALT_ROUNDS)
    private static jwtSecret = String(process.env.JWT_SECRET)

    static async encryptPassword(value: string): Promise<string> {
        const salt = await genSalt(this.saltRounds);
        return hash(value, salt);
    }

    static async validatePassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await compare(password, encryptedPassword);
    }

    static async generateToken(user: Partial<User>): Promise<string> {
        return jwt.sign(user, this.jwtSecret, { expiresIn: "1h" });
    }

    static verifyToken(token: string): User {
        return jwt.verify(token, this.jwtSecret) as User;
    }
}