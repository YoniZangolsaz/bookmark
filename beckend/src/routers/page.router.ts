import express from 'express';
import pageController from '../controllers/page.controller';

const router = express.Router();

router.post('/', pageController.addPage);
router.delete('/:id', pageController.deletePage);

export default router;