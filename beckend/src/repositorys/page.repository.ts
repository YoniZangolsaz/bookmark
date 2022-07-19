import pageModel from '../mongo/pageModel';
import { pageInterface } from '../interfaces/page.interface';
import mongoose from 'mongoose';

const addPage = async (newPage: pageInterface) => {
  const page = new pageModel(newPage);
  await page.save();
  return page;
};

const getAllPages = async (): Promise<pageInterface[]> => {
  return await pageModel.find({});
};

const getPageById = async (pageId: string): Promise<pageInterface> => {
  return await pageModel.findById(pageId).lean();
};

const deletePage = async (pageId: string): Promise<pageInterface> => {
  return await pageModel
    .deleteOne({ _id: new mongoose.Types.ObjectId(pageId.toString()) })
    .lean();
};

const getBookmarksInPage = async (id: string) => {
  return await pageModel.find({bookmarks: id}).lean();
};

const deleteBookmark = async (bookmarkId: string) => {
  const page = await pageModel
    .findOneAndUpdate(
      { bookmarks: bookmarkId },
      { $pull: { bookmarks: bookmarkId } },
      { new: true }
    )
    .lean();

  return page;
};

export default { addPage, getAllPages, getPageById, deletePage, getBookmarksInPage, deleteBookmark };
