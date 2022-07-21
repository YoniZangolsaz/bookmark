import { Request, Response } from 'express';
import userManager from '../managers/user.manager';
import {
  userInterface,
} from '../interfaces/user.interface';

const getUser = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const answer = await userManager.getUser(username, password);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const nameQuery: string = req.body.user.username;
    const passwordQuery: string = req.body.user.password;

    const newUser: userInterface = {
      username: nameQuery,
      password: passwordQuery,
    };
    const answer = await userManager.addUser(newUser);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


const userData = async (req: Request, res: Response) => {
  try {
    const userName: string = req.body.username;
    const password: string = req.body.password;

    const answer = await userManager.userData(
      userName,
      password
    );
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export default {
  getUser,
  addUser,
  userData,
};
