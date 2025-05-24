import express from 'express';
import session from 'express-session';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

//laten staan
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares: laten staan
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//hiertussen de rest typen :)

// 404 fallback:laten staan
app.use((req, res) => {
  res.status(404).render('404');
});
//laten staan (server opstarten)
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



