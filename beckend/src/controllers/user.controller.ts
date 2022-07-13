import { Request, Response } from 'express';
import userManager from '../managers/user.manager';
import {
  userInterface,
  usernameInterface,
  userAggregateInterface,
  // usernamesAndRolesInterface,
} from '../interfaces/user.interface';

// GET http://localhost:3020/users/
const getUserByName = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const answer: userAggregateInterface = await userManager.getUser(
      username,
      password
    );
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;

    const answer: userInterface = await userManager.getUserById(userId);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const nameQuery: string = req.body.username;
    const passwordQuery: string = req.body.password;
    const pagesQuery: string[] = req.body.pages

    const newUser: userInterface = {
      username: nameQuery,
      password: passwordQuery,
      pages: pagesQuery
    };
    const answer = await userManager.addUser(newUser);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getAllusernames = async (_req: Request, res: Response) => {
  try {
    const usernames: usernameInterface[] = await userManager.getAllusernames();
    res.send(usernames);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

// const getAllusernamesAndRoles = async (_req: Request, res: Response) => {
//   try {
//     const usernamesAndRoles: usernamesAndRolesInterface[] =
//       await userManager.getAllusernamesAndRoles();
//     res.send(usernamesAndRoles);
//   } catch (err: any) {
//     res.status(err?.response?.status || 500).json({ message: err.message });
//   }
// };

const checkIfUserNameExist = async (req: Request, res: Response) => {
  try {
    const userName: string = req.params.username;

    const answer: boolean = await userManager.checkIfUserNameExist(userName);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const checkUserRole = async (req: Request, res: Response) => {
  try {
    const userName: string = req.body.username;
    const password: string = req.body.password;

    const answer: boolean = await userManager.checkUserRole(userName, password);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const checkUserExist = async (req: Request, res: Response) => {
  try {
    const userName: string = req.body.username;
    const password: string = req.body.password;

    const answer: boolean = await userManager.checkUserExist(
      userName,
      password
    );
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const changeUserName = async (req: Request, res: Response) => {
  try {
    const oldUserName: string = req.params.oldusername;
    const newUserName: string = req.body.username;

    const answer: boolean = await userManager.changeUserName(
      oldUserName,
      newUserName
    );
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getUserByName,
  getUserById,
  addUser,
  getAllusernames,
  // getAllusernamesAndRoles,
  checkIfUserNameExist,
  checkUserRole,
  checkUserExist,
  changeUserName,
};
