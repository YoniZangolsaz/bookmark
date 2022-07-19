import { Request, Response } from 'express';
import bookmarkManager from '../managers/bookmark.manager';
import { bookmarkInterface } from '../interfaces/bookmark.interface';

const addBookmark = async (req: Request, res: Response) => {
  try {
    const pageID:string = req.body.index;
    const titleQuery: string = req.body.bookmark.title;
    const urlQuery: string = req.body.bookmark.url;
    const tagsQuery: string[] = req.body.bookmark.tags || [];

    const newBookmark: bookmarkInterface = { 
      title: titleQuery,
      url: urlQuery,
      tags: tagsQuery,
    };

    const answer = await bookmarkManager.addBookmark(newBookmark, pageID);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBookmark = async (req: Request, res: Response) => {
  try {
    const pageID:string = req.body.index;
    const bookmarkId: string = req.body.bookmark;

    const bookmark: bookmarkInterface = await bookmarkManager.deleteBookmark(bookmarkId, pageID);
    res.send(bookmark);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

// const getBtnsTitle = async (_req: Request, res: Response) => {
//   try {
//     const btnsTitle: btnTitleInterface[] = await btnManager.getBtnsTitle(); // TODO: add prettier
//     res.send(btnsTitle);
//   } catch (err: any) {
//     res.status(err?.response?.status || 500).json({ message: err.message });
//   }
// };

// const getAllBtns = async (_req: Request, res: Response) => {
//   try {
//     const allBtns: btnInterface[] = await btnManager.getAllBtns();
//     res.send(allBtns);
//   } catch (err: any) {
//     res.status(err?.response?.status || 500).json({ message: err.message });
//   }
// };

// const getBtnById = async (req: Request, res: Response) => {
//   try {
//     const title: string = req.params.id;

//     const answer: btnInterface = await btnManager.getBtnById(title);
//     res.send(answer);
//   } catch (err: any) {
//     res.status(err?.response?.status || 500).json({ message: err.message });
//   }
// };

export default { addBookmark, deleteBookmark };
