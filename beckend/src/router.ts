import express, { Request, Response, Application } from 'express';
import loginRouter from './routers/login.router';
import usersRouter from './routers/users.router';
import btnRouter from './routers/btn.router';
import pageRouter from './routers/page.router';

import morgan from 'morgan';
import cors from 'cors';

function routers(app: Application) {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/login', loginRouter);
  app.use('/users', usersRouter);
  app.use('/buttons', btnRouter);
  app.use('/page', pageRouter);

  // TODO: isAlive should probably check connection to mongo
  app.use('/isAlive', (_req: Request, res: Response) => {
    res.status(200).send('alive');
  });

  app.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
  });
}

export default routers;
