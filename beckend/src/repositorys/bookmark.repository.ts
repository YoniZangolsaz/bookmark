import bookmarkModel from '../mongo/bookmarkModel';
import pageModel from '../mongo/pageModel';
import { bookmarkInterface } from '../interfaces/bookmark.interface';
import mongoose from 'mongoose';


const addBookmark = async (newBookmark: bookmarkInterface, pageID: string) => {
  const bookmark = new bookmarkModel(newBookmark);
  await bookmark.save();
  await pageModel.findByIdAndUpdate(pageID, {$push: {bookmarks: bookmark._id}})
  return bookmark;
};

const deleteBookmark = async (bookmarkId: string): Promise<bookmarkInterface> => {
  return await bookmarkModel
    .deleteOne({ _id: new mongoose.Types.ObjectId(bookmarkId.toString()) })
    .lean();
};

export default { addBookmark, deleteBookmark };
