import { openPageInterface } from '../interfaces/page.interface';

interface userInterface {
  username: string;
  password: string;
  pages?: string[];
}

interface userAggregateInterface {
  username: string;
  password: string;
  pages?: openPageInterface;
}

export {
  userInterface,
  userAggregateInterface,
};
