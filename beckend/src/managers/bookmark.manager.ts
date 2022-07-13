import btnRepository from '../repositorys/bookmark.repository';
import { bookmarkInterface } from '../interfaces/bookmark.interface';

const addBookmark = async (bookmark: bookmarkInterface) => {
  const newBookmark: any = await btnRepository.addBookmark(bookmark);
  return newBookmark;
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


export default { addBookmark  };
