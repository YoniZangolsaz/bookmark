import { Request, Response } from 'express';
import userManager from '../managers/user.manager';
import { userAggregateInterface } from '../interfaces/user.interface';

// POST http://localhost:3020/login/
const login = async (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  try {
    const user: userAggregateInterface = await userManager.getUser(username, password);
    if (user) {
      return res.send({ user, data:user.pages });
    }

    return res.status(404).send('not found');
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default { login };
