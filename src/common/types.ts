import { Request } from 'express';
import { User } from '../models';

export interface AuthRequest extends Request {
  user?: Omit<User, 'password' | 'id'>;
}

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
}
