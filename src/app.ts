import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './src/routes/auth';
import quizRoutes from './routes/quizRoutes';
import favoriteRoutes from './routes/favoritesRoutes';
import blacklistRoutes from './routes/blacklistRoutes';
import { connectToDb } from './models/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

connectToDb().then(() => console.log('Connected to MongoDB'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/', quizRoutes);
app.use('/', favoriteRoutes);
app.use('/', blacklistRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

export default app;

// 404 fallback:laten staan
app.use((req, res) => {
  res.status(404).render('404');
});
//laten staan (server opstarten)
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



