import express from 'express';
import bookmarkController from '../controllers/bookmark.controller';

const router = express.Router();

router.post('/', bookmarkController.addBookmark);
router.delete('/:bookmarkId', bookmarkController.deleteBookmark);

export default router;
