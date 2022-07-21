import userRepository from '../repositorys/user.repository';
// import {
//   userInterface,
//   } from '../interfaces/user.interface';
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
const userData = async (name: string, password: string) => {
  const user = await userRepository.getAggragateUser(name, password);
  return user.pages;
};


const addUser = async (user: any) => {
  user.password = encrypt(user.password, secretKey, initializationVector);
  const newUser = await userRepository.addUser(user);
  return newUser;
};


const addPage = async (userName: string, pageId: string) => {
  const user = await userRepository.addPage(userName, pageId);
  return user;
};

export default {
  getUser,
  addUser,
  userData,
  addPage
};
