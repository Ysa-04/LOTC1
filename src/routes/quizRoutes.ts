import express from 'express';
import { verifyToken } from '../middleware/auth';
import { startQuiz } from '../controllers/quizControllers';

const router = express.Router();

router.get('/quiz/start', verifyToken, startQuiz);

export default router;