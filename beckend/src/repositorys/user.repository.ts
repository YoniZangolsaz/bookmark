import userModel from '../mongo/userModel';
import {
  userInterface,
  usernameInterface,
  // usernamesAndRolesInterface,
} from '../interfaces/user.interface';

const getUser = async (
  username: string,
  password: string
): Promise<userInterface> => {
  return await userModel.findOne({ username, password }).lean();
};

const getUserById = async (userId: string): Promise<userInterface> => {
  return await userModel.findById(userId).lean();
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
  const user = {
    username: newUser.username,
    password: newUser.password,
    pages: [],
  };
  const userNew = new userModel(user);
  await userNew.save();
  return userNew;
};

const getAllusernames = async (): Promise<usernameInterface[]> => {
  return await userModel.find({}).select('username');
};

// const getAllusernamesAndRoles = async (): Promise<
//   usernamesAndRolesInterface[]
// > => {
//   return await userModel.find({}).select('username role');
// };

const checkIfUserNameExist = async (username: string): Promise<boolean> => {
  const userExist = await userModel.exists({ username: username });
  if (userExist) {
    return true;
  } else {
    return false;
  }
};

const checkUserRole = async (
  username: string,
  password: string
): Promise<boolean> => {
  const checkUserRole = await userModel
    .exists({ username: username, password: password, role: 'manager' })
    .lean();
  if (checkUserRole) {
    return true;
  } else {
    return false;
  }
};

const checkUserExist = async (
  username: string,
  password: string
): Promise<boolean> => {
  const checkUserRole = await userModel
    .exists({ username: username, password: password })
    .lean();
  if (checkUserRole) {
    return true;
  } else {
    return false;
  }
};

const changeUserName = async (
  oldUserName: string,
  newUserName: string
): Promise<boolean> => {
  const changeUsername = await userModel.findOneAndUpdate(
    { username: oldUserName },
    { username: newUserName }
  );
  if (
    changeUsername &&
    oldUserName !== newUserName &&
    newUserName !== undefined
  ) {
    return true;
  } else {
    return false;
  }
};

export default {
  getUser,
  getUserById,
  addUser,
  getAggragateUser,
  getAllusernames,
  checkIfUserNameExist,
  checkUserRole,
  checkUserExist,
  // getAllusernamesAndRoles,
  changeUserName,
  addPage,
  deletePage,
};
