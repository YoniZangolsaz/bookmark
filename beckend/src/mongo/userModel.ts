import mongoose from 'mongoose';
import config from '../config/config';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: config.pagesCollection,
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model(config.userCollection, userSchema);

export default userModel;
