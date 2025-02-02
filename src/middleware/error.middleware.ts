import { NextFunction, Request, Response } from 'express';

export const errorHandlerMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof Error) {
    res.status(500).json({ message: `An error occurred: ${error.message}` });
  }

  res.status(500).json({ message: 'An error occurred' });
};
