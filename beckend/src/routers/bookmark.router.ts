import express from 'express';
import bookmarkController from '../controllers/bookmark.controller';

const router = express.Router();

router.post('/', bookmarkController.addBookmark);
// router.get('/title', btnController.getBtnsTitle);
// router.get('/:id', btnController.getBtnById);
// router.get('/', btnController.getAllBtns);



export default router;
