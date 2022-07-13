import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/new', userController.addUser);
router.get('/', userController.getUser);
router.get('/id/:id', userController.getUserById);
router.get('/username', userController.getAllusernames);
// router.get('/usernameandroles', userController.getAllusernamesAndRoles);
router.get('/username/exist/:username', userController.checkIfUserNameExist);
router.post('/checkuserrole', userController.checkUserRole);
router.post('/checkuserexist', userController.checkUserExist);
router.patch('/changeusername/:oldusername', userController.changeUserName);

export default router;
