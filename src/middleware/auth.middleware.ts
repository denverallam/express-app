import { NextFunction, Response } from 'express';
import { Types } from '../common';
import { AuthService } from '../services';

export const authenticate = (
  req: Types.AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const user = AuthService.verifyToken(token);

    if (!user) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
