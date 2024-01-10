import { IBaseDTO } from './general';

export interface ITopOffers {
  results: ITopOffersResults[];
}

export interface ITopOffersResults {
  id: number;
  name: string;
  lot_price: number;
  lot_selected_currency_price: number;
  lot_company: IBaseDTO;
  lot_delivery_method: IBaseDTO;
}
