import userModel from '../mongo/userModel';
import {
  userInterface,
  usernameInterface,
  userAggregateInterface,
  usernamesAndRolesInterface,
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

const getAggragateUser = async (
  username: string,
  password: string
): Promise<userAggregateInterface> => {
  const user = await userModel.aggregate([
    {
      $match: { username, password },
    },
    {
      $lookup: {
        from: 'pages',
        localField: 'pages',
        foreignField: '_id',
        as: 'pages',
      },
    },
    {
      $unwind: {
        path: '$pages',
      },
    },
    {
      $lookup: {
        from: 'btns',
        localField: 'pages.btns',
        foreignField: '_id',
        as: 'pages.btns',
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          username: '$username',
          password: '$password',
          role: '$role',
        },
        pages: {
          $push: {
            btns: '$pages.btns',
            title: '$pages.title',
          },
        },
      },
    },
    {
      $project: {
        _id: '$_id._id',
        username: '$_id.username',
        password: '$_id.password',
        role: '$_id.role',
        pages: '$pages',
      },
    },
  ]);

  return user[0];
};

const addUser = async (newUser: userInterface, newPages: string[]) => {
  const user = {
    username: newUser.username,
    password: newUser.password,
    role: newUser.role,
    pages: newPages,
  };
  const userNew = new userModel(user);
  await userNew.save();
  return userNew;
};

const getAllusernames = async (): Promise<usernameInterface[]> => {
  return await userModel.find({}).select('username');
};

const getAllusernamesAndRoles = async (): Promise<
  usernamesAndRolesInterface[]
> => {
  return await userModel.find({}).select('username role');
};

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
  if (changeUsername && oldUserName !== newUserName && newUserName !== undefined) {
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
  getAllusernamesAndRoles,
  changeUserName,
};
