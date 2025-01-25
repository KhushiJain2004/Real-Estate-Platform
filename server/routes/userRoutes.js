import express from 'express';
import {getUser,updateUser,deleteUser,getUserPost, getAllUsers} from '../controllers/userController.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const router=express.Router();

router.get('/all',verifyToken,getAllUsers);
router.get('/',verifyToken,getUser);
router.get('/post',verifyToken,getUserPost);
router.put('/:id',verifyToken,updateUser);
router.delete('/:id',verifyToken,deleteUser);

export default router;