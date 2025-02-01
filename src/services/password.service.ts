import { compare, genSalt, hash } from 'bcrypt';


export class PasswordService {
    private static saltRounds = Number(process.env.SALT_ROUNDS)

    static async encryptPassword(value: string): Promise<string> {
        const salt = await genSalt(this.saltRounds);
        return hash(value, salt);
    }

    static async validatePassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await compare(password, encryptedPassword);
    }

}