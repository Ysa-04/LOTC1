import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token || req.headers['authorization'];
  if (!token) {
    res.status(403).send('No token provided');
    return; 
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err: any, decoded: any) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }

    req.userId = decoded.id;
    next();
  });
}
