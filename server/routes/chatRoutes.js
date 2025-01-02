import express from 'express';
import { createChat, getAllChats, getChat } from '../controllers/chatController.js';
import {verifyToken} from '../middlewares/verifyToken.js'

const router=express.Router();

router.get('/',verifyToken,getAllChats);
router.get('/:chatId',verifyToken,getChat);
router.post('/',verifyToken,createChat);

export default router;