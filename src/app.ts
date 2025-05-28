import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import loginRoutes from './routes/loginRoutes';
import mainRoutes from './routes/mainRoutes';
import quizRoutes from './routes/quizRoutes';
import favoriteRoutes from './routes/favoritesRoutes';
import blacklistRoutes from './routes/blacklistRoutes';
import { connectToDb } from './models/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

connectToDb().then(() => console.log('Connected to MongoDB')).catch(err => {
  console.error('Kon niet verbinden met MongoDB:', err);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'geheime sleutel',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  console.log('Route aangeroepen:', req.method, req.url);
  next();
});

app.use('/login', loginRoutes);
app.use('/quiz', quizRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/blacklist', blacklistRoutes);
app.use('/', mainRoutes);


app.get('/', (req, res) => {
  res.render('index');
});

// Als geen enkele route matcht: toon een 404‐pagina (wél énkel na alle andere routes):
app.use((req, res) => {
  res.status(404).render('404');
});





export default app;
