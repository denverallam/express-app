import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../models';
import { AuthService } from '../services';
import { validateEmail } from '../util';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, userName } = req.body;

    if (!validateEmail(email)) {
      res.status(400).json({ message: 'Invalid email' });
      return;
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { userName }],
      },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Email or Username already used' });
      return;
    }

    const result = await User.create({
      ...req.body,
    });

    const { password: _, ...userWithoutPassword } = result.get();
    res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await AuthService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const { password: _, ...userWithoutPassword } = user.get();
    const token = await AuthService.generateToken(userWithoutPassword);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
