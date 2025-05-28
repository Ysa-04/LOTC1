import express from 'express';
import { verifyToken } from '../middleware/login';
import { startQuiz, answerQuiz } from '../controllers/quizControllers';

const router = express.Router();

// Deze worden beschikbaar als /quiz/start en /quiz/answer
router.get('/start', verifyToken, startQuiz);
router.post('/answer', verifyToken, answerQuiz);

export default router;
