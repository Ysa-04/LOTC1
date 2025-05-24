import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function verifyToken(req: any, res: Response, next: NextFunction) {
  const token = req.cookies.token || req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token, process.env.JWT_SECRET || '', (err: any, decoded: any) => {
    if (err) return res.status(401).send('Unauthorized');
    req.userId = decoded.id;
    next();
  });
}