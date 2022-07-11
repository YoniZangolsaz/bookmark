import { btnInterface } from './bookmark.interface';
interface pageInterface {
  title: String;
  bookmarks: string[];
  _id?: string;
}
interface openPageInterface {
  title: String;
  bookmarks: btnInterface[];
  _id?: string;
}

export { pageInterface, openPageInterface };
