import bookmarkRepository from '../repositorys/bookmark.repository';
import pageRepository from '../repositorys/page.repository';
import { bookmarkInterface } from '../interfaces/bookmark.interface';

const addBookmark = async (bookmark: bookmarkInterface, pageID: string) => {
  const newBookmark: any = await bookmarkRepository.addBookmark(bookmark, pageID);
  return newBookmark;
};

const deleteBookmark = async (bookmarkId: string) => {
  await pageRepository.deleteBookmark(bookmarkId)
  const bookmark: bookmarkInterface = await bookmarkRepository.deleteBookmark(bookmarkId);
  return bookmark;
};

export default { addBookmark, deleteBookmark  };
