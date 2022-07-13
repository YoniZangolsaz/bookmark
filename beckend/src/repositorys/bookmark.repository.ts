import bookmarkModel from '../mongo/bookmarkModel';
import { bookmarkInterface } from '../interfaces/bookmark.interface';

const addBookmark = async (newBookmark: bookmarkInterface) => {
  const bookmark = new bookmarkModel(newBookmark);
  await bookmark.save();
  return bookmark;
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

export default { addBookmark };
