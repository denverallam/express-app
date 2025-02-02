import { Router } from 'express';
import { AuthController } from '../controllers';

export const authRoute = Router();

authRoute.post('/register', AuthController.register);
authRoute.post('/login', AuthController.login);
