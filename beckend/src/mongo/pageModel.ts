import mongoose from 'mongoose';
import config from '../config/config';

// Mongoose schema of the merged object
const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    bookmarks: [
      { type: mongoose.Schema.Types.ObjectId, ref: config.bookmarksCollection, required: true },
    ],
  },
  {
    versionKey: false,
  }
);

const pageModel = mongoose.model(config.pagesCollection, pageSchema);

export default pageModel;
