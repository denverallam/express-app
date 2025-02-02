import { Request } from "express";
import { User } from "../models";

export interface AuthRequest extends Request {
    user?: Partial<User>
}

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    userName: string
    firstName: string;
    lastName: string;
}