import userRepository from '../repositorys/user.repository';
import {
  userInterface,
  usernameInterface,
  // usernamesAndRolesInterface,
} from '../interfaces/user.interface';
// import pageManager from '../managers/page.manager';
import config from '../config/config';

const crypto = require('crypto');

function encrypt(val: string, ENC_KEY: Buffer, IV: Buffer) {
  let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

const initializationVector = Buffer.from(config.initializationVector); // some string with lenth of 16
const secretKey = Buffer.from(config.secretKey); // some string with lenth of 32

const getUser = async (name: string, password: string) => {
  const user = await userRepository.getAggragateUser(
    name,
    encrypt(password, secretKey, initializationVector)
  );
  return user;
};

const getUserById = async (userId: string) => {
  const user: userInterface = await userRepository.getUserById(userId);
  return user;
};

const addUser = async (user: any) => {
  user.password = encrypt(user.password, secretKey, initializationVector);
  const newUser = await userRepository.addUser(user);
  return newUser;
};

const getAllusernames = async () => {
  const getAllusernames: usernameInterface[] =
    await userRepository.getAllusernames();
  return getAllusernames;
};

// const getAllusernamesAndRoles = async () => {
//   const getAllusernamesAndRoles: usernamesAndRolesInterface[] =
//     await userRepository.getAllusernamesAndRoles();
//   return getAllusernamesAndRoles;
// };

const checkIfUserNameExist = async (userName: string) => {
  const user: boolean = await userRepository.checkIfUserNameExist(userName);
  return user;
};

const checkUserRole = async (userName: string, password: string) => {
  const user: boolean = await userRepository.checkUserRole(userName, password);
  return user;
};

const checkUserExist = async (userName: string, password: string) => {
  const user: boolean = await userRepository.checkUserExist(userName, password);
  return user;
};

const changeUserName = async (oldUserName: string, newUserName: string) => {
  const username: boolean = await userRepository.changeUserName(
    oldUserName,
    newUserName
  );
  return username;
};

export default {
  getUser,
  getUserById,
  addUser,
  getAllusernames,
  checkIfUserNameExist,
  checkUserRole,
  checkUserExist,
  // getAllusernamesAndRoles,
  changeUserName,
};
