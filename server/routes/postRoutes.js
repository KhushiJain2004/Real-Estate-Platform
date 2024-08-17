import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAllPosts,getPost,addPost,deletePost,updatePost ,savePost} from "../controllers/postController.js";

const router = express.Router();

router.get('/',getAllPosts);
router.get('/:id',getPost);
router.post('/',verifyToken,addPost);
router.put('/:id',verifyToken,updatePost);
router.delete('/:id',verifyToken,deletePost);
router.get('/save/:postId',verifyToken,savePost);

export default router;