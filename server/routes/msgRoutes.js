import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { sendMsg } from '../controllers/msgController.js';

const router=express.Router();

router.post('/:chatId',verifyToken,sendMsg);

export default router;