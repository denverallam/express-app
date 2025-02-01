import bcrypt from 'bcrypt'

const saltRounds = Number(process.env.SALT_ROUNDS)

export const encryptPassword = async (value: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(value, salt);
}