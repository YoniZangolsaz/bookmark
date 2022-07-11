import express from 'express';
import btnController from '../controllers/bookmark.controller';

const router = express.Router();

router.post('/', btnController.addBtn);
router.get('/title', btnController.getBtnsTitle);
router.get('/:id', btnController.getBtnById);
router.get('/', btnController.getAllBtns);



export default router;
