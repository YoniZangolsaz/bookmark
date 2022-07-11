import express, { Application } from 'express';
import config from './config/config';
import routers from './router';

const PORT = config.port;

export const app: Application = express();

function startServer() {
  routers(app);

  app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
  });
}

export default startServer;

