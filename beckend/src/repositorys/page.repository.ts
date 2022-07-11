import pageModel from '../mongo/pageModel';
import {pageInterface} from '../interfaces/page.interface';

const addPage = async (newPage: pageInterface) => {
  const page = new pageModel(newPage);
  await page.save();
  return page;
};

const getAllPages = async (): Promise<pageInterface[]> => {
  return await pageModel.find({});
};

const getPageById = async (pageId: string): Promise<pageInterface> => {
    return await pageModel.findById( pageId ).lean();
};

export default { addPage, getAllPages, getPageById };
