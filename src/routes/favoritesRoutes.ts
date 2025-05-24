import express from 'express';
import { verifyToken } from '../middleware/login';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoritesControllers';

const router = express.Router();

router.use(verifyToken);
router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/', removeFavorite);

export default router;