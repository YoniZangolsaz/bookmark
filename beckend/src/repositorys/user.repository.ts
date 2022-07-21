import userModel from '../mongo/userModel';
import {
  userInterface,
} from '../interfaces/user.interface';

const getUser = async (
  username: string,
  password: string
): Promise<userInterface> => {
  return await userModel.findOne({ username, password }).lean();
};

const addPage = async (
  username: string,
  pageId: string
): Promise<userInterface> => {
  const user = await userModel
    .findOneAndUpdate({ username }, { $push: { pages: pageId } }, { new: true })
    .lean();

  return user as any as userInterface;
};

const deletePage = async (pageId: string) => {
  const user = await userModel
    .findOneAndUpdate(
      { pages: pageId },
      { $pull: { pages: pageId } },
      { new: true }
    )
    .lean();

  return user;
};

const getAggragateUser = async (username: string, password: string) => {
  const populatedUser = await userModel.find({ username, password }).populate({
    path: 'pages',
    populate: {
      path: 'bookmarks',
    },
  });
  return populatedUser[0];
};

const addUser = async (newUser: userInterface) => {
  const user: userInterface = {
    username: newUser.username,
    password: newUser.password,
    pages: [],
  };
  const userNew = new userModel(user);
  await userNew.save();
  return userNew;
};

export default {
  getUser,
  addUser,
  getAggragateUser,
  addPage,
  deletePage,
};