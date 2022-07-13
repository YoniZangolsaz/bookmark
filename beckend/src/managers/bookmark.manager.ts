import btnRepository from '../repositorys/btn.repository';
import { btnTitleInterface, btnInterface } from '../interfaces/bookmark.interface';

const addBtn = async (btn: btnInterface) => {
  const newBtn: any = await btnRepository.addBtn(btn);
  return newBtn;
};

const getBtnsTitle = async () => {
  const getBtnsTitle: btnTitleInterface[] = await btnRepository.getBtnsTitle();
  return getBtnsTitle;
};

const getAllBtns = async () => {
  const getAllBtns: btnInterface[] = await btnRepository.getAllBtns();
  return getAllBtns;
};

const getBtnById = async (title: string) => {
  const getBtn: btnInterface = await btnRepository.getBtnById(title);
  return getBtn;
};


export default { getBtnsTitle, getAllBtns, addBtn, getBtnById };
