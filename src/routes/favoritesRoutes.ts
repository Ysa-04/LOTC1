import express from 'express';
import { verifyToken } from '../middleware/auth';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favorites';

const router = express.Router();

router.use(verifyToken);
router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/', removeFavorite);

export default router;