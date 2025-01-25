import express from 'express';
import { createChat, findChat, getAllChats, readChat } from '../controllers/chatController.js';
import {verifyToken} from '../middlewares/verifyToken.js'

const router=express.Router();

router.get('/',verifyToken,getAllChats);
router.get('/find',verifyToken,findChat);
router.get('/:chatId',verifyToken,readChat);
router.post('/',verifyToken,createChat);

export default router;