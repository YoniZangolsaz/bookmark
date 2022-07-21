import mongoose from 'mongoose';
import config from '../config/config';

const bookmarkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    tags: { type: [String] }
  },
  {
    versionKey: false,
  }
);

const bookmarkModel = mongoose.model(config.bookmarksCollection, bookmarkSchema);

export default bookmarkModel;
