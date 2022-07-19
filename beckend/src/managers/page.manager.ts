import pageRepository from '../repositorys/page.repository';
import { pageInterface } from '../interfaces/page.interface';
import userRepository from '../repositorys/user.repository';
import bookmarkRepository from '../repositorys/bookmark.repository';

// import { btnInterface } from '../interfaces/btn.interface';

const addPage = async (page: pageInterface, userName: string) => {
  const newPage: any = await pageRepository.addPage(page);
  const user = await userRepository.addPage(userName, newPage._id);
  user;
  return newPage;
};

const getAllPages = async () => {
  const pages: pageInterface[] = await pageRepository.getAllPages();
  return pages;
};

const getPageById = async (pageId: string) => {
  const page: pageInterface = await pageRepository.getPageById(pageId);
  return page;
};

const deletePage = async (pageId: string) => {
  await userRepository.deletePage(pageId);
  const bookmarksInPage = await (await pageRepository.getPageById(pageId)).bookmarks
  console.log(bookmarksInPage);
  for (let i = 0; i < bookmarksInPage.length; i++) {
    await bookmarkRepository.deleteBookmark(bookmarksInPage[i])
  }
  
  const page: pageInterface = await pageRepository.deletePage(pageId);
  return page;
};

// const updateBtnsInPage = async (pageId: string, btnId: string) => {
//     try {
//       const page: pageInterface = await getPageById(pageId);
//       const btn: btnInterface = await getBtnById(btnId);
//       let msg: string = 'message';

//       if (trainer.classIDs.includes(classID)) {
//         return 'class already in group';
//       }

//       if (!classQuery) {
//         return 'The class not exist';
//       }

//       if ((await trainer.age) < 20 || trainer.age > 40) {
//         return 'The age of trainer must be between 20 - 40';
//       }
//       for (let i = 0; i < trainer.classIDs.length; i += 1) {
//         const classListInTrainer: classInterface = await getClassByClassID(
//           trainer.classIDs[i]
//         );
//         if (
//           classQuery.endTime <= classListInTrainer.startTime ||
//           classQuery.startTime >= classListInTrainer.endTime
//         ) {
//           await trainerRepository.updateClassIDs(userID, classID);
//           msg = ` ${classID} update class successfully`;
//         } else {
//           msg = 'The trainer enrolled in another class during these hours';
//         }
//       }
//       return msg;
//     } catch (error) {
//       return error.toString();
//     }
//   };

export default { addPage, getAllPages, getPageById, deletePage };
