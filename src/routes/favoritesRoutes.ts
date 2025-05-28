import express from 'express';
import { verifyToken } from '../middleware/login';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoritesControllers';

const router = express.Router();

router.get('/', verifyToken, getFavorites);
router.post('/add', verifyToken, addFavorite);
router.post('/remove', verifyToken, removeFavorite);

export default router;