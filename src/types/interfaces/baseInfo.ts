export interface IGetBaseInfo {
  header?: IHeaderBaseInfo;
  footer?: IFooterBaseInfo;
}

export interface ICurrencies {
  costs: number;
  costs_change: null;
  currency_sign: string;
  id: number;
  iso_code: string;
  name: string;
}

export interface IHeaderBaseInfo {
  currencies: ICurrencies[];
}

export interface IFooterBaseInfo {
  contacts: {
    address: string;
    country: string;
    main: boolean;
    phone_number: IPhoneNumber;
    title: string;
    website: string;
  };
}

export interface IPhoneNumber {
  phone_number?: string;
}
