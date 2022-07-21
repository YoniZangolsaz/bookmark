import pageRepository from '../repositorys/page.repository';
import { pageInterface } from '../interfaces/page.interface';
import userRepository from '../repositorys/user.repository';
import bookmarkRepository from '../repositorys/bookmark.repository';

const addPage = async (page: pageInterface, userName: string) => {
  const newPage: any = await pageRepository.addPage(page);
  const user = await userRepository.addPage(userName, newPage._id);
  user;
  return newPage;
};


const deletePage = async (pageId: string) => {
  await userRepository.deletePage(pageId);
  const bookmarksInPage = await (await pageRepository.getPageById(pageId)).bookmarks
  for (let i = 0; i < bookmarksInPage.length; i++) {
    await bookmarkRepository.deleteBookmark(bookmarksInPage[i])
  }
  const page: pageInterface = await pageRepository.deletePage(pageId);
  return page;
};


export default { addPage, deletePage };
