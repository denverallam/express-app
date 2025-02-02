import { NextFunction, Response } from 'express';
import { Types } from '../common';
import { User } from '../models';

export const getProfile = async (
  req: Types.AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findOne({ where: { email: req.user.email } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { password, ...userWithoutPassword } = user.get();
    res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};
