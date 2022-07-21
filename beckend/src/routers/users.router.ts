import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/new', userController.addUser);
router.get('/', userController.getUser);
router.post('/userData', userController.userData);

export default router;
