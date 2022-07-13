import mongoose from 'mongoose';
import config from '../config/config';

// Mongoose schema of the merged object
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
