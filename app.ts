import express from 'express';
import session from 'express-session';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import path from 'path';
import authRoutes from './routes/auth';
import quizRoutes from './routes/quiz';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connect
const client = new MongoClient(process.env.MONGO_URI || '');

(async () => {
  try {
    await client.connect();
    console.log('MongoDB connected');
  } catch (e) {
    console.error('MongoDB error:', e);
    process.exit(1); // Sluit af wanneer connectie faalt
  }
})();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || '', collectionName: 'sessions' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Custom Middleware for Authentication Check
declare module 'express-session' {
  interface SessionData {
    user?: any; 
  }
}
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/user', userRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
