import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token || req.headers['authorization'];
  if (!token) {
    res.status(403).send('No token provided');
    return; // gewoon return; géén Response teruggeven
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded: any) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }

    req.userId = decoded.id;
    next();
  });
}
