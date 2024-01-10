import { TypeTab } from './auth';
import { IBaseDTO, TypeOperation } from './general';

export interface ILotsResult {
  id: number;
  nomenclature: ILotNomenclature;
  company: ICompany;
  is_purchase: boolean;
  expired_at: string;
  price: number;
  selected_currency_price: number | null;
  quantity: number;
  current_offer: ICurrentOffer | null;
  payment_method: IMethod;
  grace_period_to: string;
  prepayment_percent: number;
  delivery_method: IMethod;
  type: TypeOperation;
  offers: IOffer[];
  comment: string;
  delivery_from: string;
  delivery_to: string;
  delivery_period: string;
  address: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  time_to_expire: null | ITime;
  units: IBaseDTO;
  key?: number;
  offers_num?: number;
}

export interface ICompany extends IBaseDTO {
  logo: string;
}
export interface IMethod extends IBaseDTO {
  description: string;
}
export interface ILotNomenclature extends IBaseDTO {
  category: IBaseDTO;
}

export interface ILots {
  results: ILotsResult[];
}

export interface IOffer extends ICurrentOffer {
  changed_conditions: string[];
  conditions_accepted: boolean;
  created_at: string;
  status: string;
}
export interface ICurrentOffer {
  id: number;
  company: ICompany;
  price: number;
  selected_currency_price: string;
}

export interface ILotsParams {
  company: number | string | undefined;
  category: string;
  nomenclature: string;
  delivery_method: string;
  payment_method: string;
  is_purchase: boolean | null;
  quantity: IUserAuctionsRange;
  price: IUserAuctionsRange;
  typeSorting: string;
  tradeType?: string;
  typeTab?: TypeTab;
}

export interface IUserAuctionsFilterParams extends ILotsParams {
  typeOperation?: string;
}

export interface IUserAuctionsRange {
  minValue: string;
  maxValue: string;
}

export interface ITime {
  days: number;
  hours: number;
  minutes: number;
}

export interface ISearchLots {
  user_lots: ILotsResult[];
  in_progress: ILotsResult[];
  user_commercial_offers: ILotsResult[];
  user_commercial_offer_answers: ILotsResult[];
  invites: ILotsResult[];
}

export enum LotEnum {
  myAuctions = 'myAuctions',
  auctionsInProgress = 'auctionsInProgress',
  myCommercialOffers = 'myCommercialOffers',
  myCommercialOffersResponse = 'myCommercialOffersResponse',
  invites = 'invites',
  archive = 'archive',
  myCustomCurrentProducts = 'myCustomCurrentProducts',
  currentDemand = 'customCurrenProductForBuy',
  currentOffers = 'customCurrenProductForSell'
}

export interface ICreateLot {
  payment_method: number;
  delivery_method: number;
  nomenclature?: number | null;
  is_purchase?: boolean;
  price: number | null;
  prepayment_percent: number | null;
  comment?: string;
  quantity?: number | null;
  units?: number;
  delivery_from: number;
  delivery_to: number;
  address?: string;
  expired_at?: number;
  grace_period_to: number;
  conditions_accepted?: boolean
}

export interface IExpiredAtTime {
  time: string;
  value: string;
  datetime: string;
}


export interface IRejectedLot {
  lot: number;
}


export interface IMyOffer {
  id: number,
  company: ICompany,
  price: number,
  selected_currency_price: number,
  conditions_accepted: boolean,
  created_at: string,
  changed_conditions: string[],
  lot: ILotsResult
}