import { Router } from 'express';
import { UserController } from '../controllers';
import { AuthMiddleware } from '../middleware';

export const userRoute = Router();

userRoute.get(
  '/profile',
  AuthMiddleware.authenticate,
  UserController.getProfile,
);
