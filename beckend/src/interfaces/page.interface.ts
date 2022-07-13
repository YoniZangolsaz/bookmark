import { bookmarkInterface } from './bookmark.interface';
interface pageInterface {
  title: string;
  bookmarks: string[];
  _id?: string;
}
interface openPageInterface {
  title: String;
  bookmarks: bookmarkInterface[];
  _id?: string;
}

export { pageInterface, openPageInterface };
