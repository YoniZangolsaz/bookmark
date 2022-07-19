import bookmarkRepository from '../repositorys/bookmark.repository';
import pageRepository from '../repositorys/page.repository';
import { bookmarkInterface } from '../interfaces/bookmark.interface';

const addBookmark = async (bookmark: bookmarkInterface, pageID: string) => {
  const newBookmark: any = await bookmarkRepository.addBookmark(bookmark, pageID);
  return newBookmark;
};

const deleteBookmark = async (bookmarkId: string, pageID: string) => {
  await pageRepository.deleteBookmark(pageID)
  const bookmark: bookmarkInterface = await bookmarkRepository.deleteBookmark(bookmarkId);
  return bookmark;
};

// const getBtnsTitle = async () => {
//   const getBtnsTitle: btnTitleInterface[] = await btnRepository.getBtnsTitle();
//   return getBtnsTitle;
// };

// const getAllBtns = async () => {
//   const getAllBtns: btnInterface[] = await btnRepository.getAllBtns();
//   return getAllBtns;
// };

// const getBtnById = async (title: string) => {
//   const getBtn: btnInterface = await btnRepository.getBtnById(title);
//   return getBtn;
// };


export default { addBookmark, deleteBookmark  };
