import { INavList } from './navList';
import { IOption } from './options';

export interface IHeaderInfo {
  navList: INavList[];
  currencyOptions: IOption[];
  languageOptions: IOption[];
  homePageNav: INavList[]
}
