import express from 'express';
import pageController from '../controllers/page.controller';

const router = express.Router();

router.post('/', pageController.addPage);
router.get('/', pageController.getAllPages);
router.get('/:id', pageController.getPageById);
// router.get('/btn/:id', pageController.putBtnInPage);


// router.put('/btn/', pageController.putBtnInPage);



export default router;