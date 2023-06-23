import express from 'express';
import { getPost,createPost,deletePost,  updatePost,likePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express();

router.get('/',getPost);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete("/:id",auth,deletePost);
router.patch("/:id/likePost",auth,likePost);

export default router;