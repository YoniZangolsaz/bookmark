import { openPageInterface } from '../interfaces/page.interface';

interface userInterface {
  username: string;
  password: string;
  role: string;
  pages?: string[];
}

interface usernameInterface {
  username: string;
}

interface usernamesAndRolesInterface {
  username: string;
  role: string;
}

interface userAggregateInterface {
  username: string;
  password: string;
  role: string;
  pages: openPageInterface[];
}

export {
  userInterface,
  usernameInterface,
  userAggregateInterface,
  usernamesAndRolesInterface,
};
