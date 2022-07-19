import bookmarkModel from '../mongo/bookmarkModel';
import pageModel from '../mongo/pageModel';
import { bookmarkInterface } from '../interfaces/bookmark.interface';
import mongoose from 'mongoose';


const addBookmark = async (newBookmark: bookmarkInterface, pageID: string) => {
  const bookmark = new bookmarkModel(newBookmark);
  await bookmark.save();
  const page = await pageModel.findByIdAndUpdate(pageID, {$push: {bookmarks: bookmark._id}})
  return page;
};

const deleteBookmark = async (bookmarkId: string): Promise<bookmarkInterface> => {
  return await bookmarkModel
    .deleteOne({ _id: new mongoose.Types.ObjectId(bookmarkId.toString()) })
    .lean();
};

// const getBtnsTitle = async (): Promise<btnTitleInterface[]> => {
//   return await bookmarkModel.find({}).select('title');
// };

// const getAllBtns = async (): Promise<btnInterface[]> => {
//   return await bookmarkModel.find({});
// };

// const getBtnById = async (title: string): Promise<btnInterface> => {
//   return await bookmarkModel.findById(title).lean();
// };

export default { addBookmark, deleteBookmark };
