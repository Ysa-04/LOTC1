import { db } from '../models/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body;
  const existingUser = await db().collection('users').findOne({ userName: username });
  if (existingUser) {
    res.status(400).send('User already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    userName: username,
    email,
    password: hashedPassword,
    favorites: [],
    blacklist: [],
    highscore: 0
  };

  await db().collection('users').insertOne(newUser);
  res.send('User registered');
}

export async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  const user = await db().collection('users').findOne({ userName: username });
  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).send('Invalid password');
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.send('Logged in');
}
