import { IBaseDTO } from './general';

export interface IGeneralNomenclatureItem {
  name: string;
  approved: boolean;
  available_for_sell: boolean;
  available_for_buy: boolean;
  category: IBaseDTO;
  custom: boolean;
  id: number;
}
export interface IGetNomenclature {
  results: IGeneralNomenclatureItem[];
}
