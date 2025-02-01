import { compare } from "bcrypt";

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validatePassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
    return await compare(password, encryptedPassword);
}