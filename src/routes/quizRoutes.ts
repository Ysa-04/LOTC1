import express from 'express';
import { verifyToken } from '../middleware/login';
import { startQuiz } from '../controllers/quizControllers';

const router = express.Router();

router.get('/quiz/start', verifyToken, startQuiz);

export default router;