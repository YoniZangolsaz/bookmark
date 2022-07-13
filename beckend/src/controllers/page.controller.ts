import { Request, Response } from 'express';
import pageManager from '../managers/page.manager';
import {pageInterface} from '../interfaces/page.interface';

const addPage = async (req: Request, res: Response) => {
  try {
    const titleQuery: string = req.body.title;
    const btnsQuery: string[] = req.body.btns;

    const newPage: any = {
      title: titleQuery,
      btns: btnsQuery,
    };

    const answer = await pageManager.addPage(newPage);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPages = async (_req: Request, res: Response) => {
  try {
    const allPages: pageInterface[] = await pageManager.getAllPages();
    res.send(allPages);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

const getPageById = async (req: Request, res: Response) => {
  try {
    const pageId = req.params.id;

    const page: pageInterface = await pageManager.getPageById(pageId);
    res.send(page);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

// const putBtnInPage = async (req: Request, res: Response) => {
//     try {
//       const pageId: string = req.params.id;
//       const btnId: string = req.body.btns;

//       const answer: pageInterface = await pageManager.updateBtnsInPage(
//         pageId,
//         btnId
//       );
//       res.send(answer);
//     } catch (err: any) {
//       res.status(500).json({ message: err.message });
//     }
//   };

export default { addPage, getAllPages, getPageById };
