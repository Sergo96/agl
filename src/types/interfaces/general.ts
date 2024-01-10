export type Language = 'en' | 'ru' | 'ua';

export type IGeneralAction = {
  type: string;
  payload?: any;
};

export interface ICountry extends IBaseDTO {
  available_for_user: boolean;
}

export interface IBaseDTO {
  id: number;
  name: string;
}

export type TypeOperation = 'auction' | 'commercial_offer' | 'current_item' | null

export interface ILinkData {
  pathname: string;
  query: any
}

export type NotificationType = {
  [key: string]: string
}

export type TradeType = 'seller' | 'buyer' | 'seller_and_buyer';