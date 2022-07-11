import { Request, Response } from 'express';
import btnManager from '../managers/bookmark.manager';
import { btnTitleInterface, btnInterface } from '../interfaces/bookmark.interface';

const addBtn = async (req: Request, res: Response) => {
  try {
    const titleQuery: string = req.body.title;
    const paramsQuery: object = req.body.params;
    const nameQuery: string = req.body.name;
    const selectQuery: string = req.body.select;
    const messageQuery: string = req.body.message;
    const typeQuery: string = req.body.type;
    const methodsQuery: string = req.body.methods;

    const newBtn: btnInterface = { 
      title: titleQuery,
      params: paramsQuery,
      name: nameQuery,
      select: selectQuery,
      message: messageQuery,
      type: typeQuery,
      methods: methodsQuery,
    };

    const answer = await btnManager.addBtn(newBtn);
    res.send(answer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getBtnsTitle = async (_req: Request, res: Response) => {
  try {
    const btnsTitle: btnTitleInterface[] = await btnManager.getBtnsTitle(); // TODO: add prettier
    res.send(btnsTitle);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

const getAllBtns = async (_req: Request, res: Response) => {
  try {
    const allBtns: btnInterface[] = await btnManager.getAllBtns();
    res.send(allBtns);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

const getBtnById = async (req: Request, res: Response) => {
  try {
    const title: string = req.params.id;

    const answer: btnInterface = await btnManager.getBtnById(title);
    res.send(answer);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({ message: err.message });
  }
};

export default { getBtnsTitle, getAllBtns, addBtn, getBtnById };
