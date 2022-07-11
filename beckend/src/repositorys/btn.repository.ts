import bookmarkModel from '../mongo/bookmarkModel';
import { btnTitleInterface, btnInterface } from '../interfaces/bookmark.interface';

const addBtn = async (newBtn: btnInterface) => {
  const btn = new bookmarkModel(newBtn);
  await btn.save();
  return btn;
};

const getBtnsTitle = async (): Promise<btnTitleInterface[]> => {
  return await bookmarkModel.find({}).select('title');
};

const getAllBtns = async (): Promise<btnInterface[]> => {
  return await bookmarkModel.find({});
};

const getBtnById = async (title: string): Promise<btnInterface> => {
  return await bookmarkModel.findById(title).lean();
};

export default { addBtn, getBtnsTitle, getAllBtns, getBtnById };
