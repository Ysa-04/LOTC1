import express from 'express';
import { verifyToken } from '../middleware/login';
import {
  addBlacklist,
  getBlacklist,
  removeBlacklist,
  updateBlacklist
} from '../controllers/blacklistControllers';

const router = express.Router();

router.get('/', verifyToken, getBlacklist);
router.post('/add', verifyToken, addBlacklist);
router.post('/remove', verifyToken, removeBlacklist);
router.post('/update', verifyToken, updateBlacklist);

export default router;