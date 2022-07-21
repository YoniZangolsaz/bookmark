import { Request, Response } from 'express';
import pageManager from '../managers/page.manager';
import { pageInterface } from '../interfaces/page.interface';

const addPage = async (req: Request, res: Response) => {
  try {
    const userName = req.body.userName;
    const titleQuery: string = req.body.title;
    const bookmarksQuery: string[] = req.body.bookmarks || [];

    const newPage: pageInterface = {
      title: titleQuery,
      bookmarks: bookmarksQuery,
    };

    const answer = await pageManager.addPage(newPage, userName);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const deletePage = async (req: Request, res: Response) => {
  try {
    const pageId = req.params.id;
    console.log(pageId);

    const page: pageInterface = await pageManager.deletePage(pageId);
    res.send(page);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

export default { addPage, deletePage };
