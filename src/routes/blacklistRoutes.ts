import express from 'express';
import { verifyToken } from '../middleware/login';
import {
  addBlacklist,
  getBlacklist,
  removeBlacklist,
  updateBlacklist
} from '../controllers/blacklistControllers';

const router = express.Router();

router.use(verifyToken);
router.get('/', getBlacklist);
router.post('/', addBlacklist);
router.delete('/', removeBlacklist);
router.put('/', updateBlacklist);

export default router;