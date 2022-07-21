import { Request, Response } from 'express';
import bookmarkManager from '../managers/bookmark.manager';
import { bookmarkInterface } from '../interfaces/bookmark.interface';

const addBookmark = async (req: Request, res: Response) => {
  try {
    const pageID: string = req.body.pageId;
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
    const bookmarkId: string = req.params.bookmarkId;
    const bookmark: bookmarkInterface = await bookmarkManager.deleteBookmark(
      bookmarkId
    );
    res.send(bookmark);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

export default { addBookmark, deleteBookmark };
