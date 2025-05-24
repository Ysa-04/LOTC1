import express from 'express';
import session from 'express-session';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

//laten staan
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const favoriteRoutes = require('./routes/favorites');
const blacklistRoutes = require('./routes/blacklist');
const { connectToDb } = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//hiertussen de rest typen :)
connectToDb().then(() => console.log('Connected to MongoDB'));

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/blacklist', blacklistRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

// 404 fallback:laten staan
app.use((req, res) => {
  res.status(404).render('404');
});
//laten staan (server opstarten)
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



