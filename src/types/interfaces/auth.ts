import { IGeneralNomenclatureItem } from './nomenclature';

export interface IPostLogin {
  username: string;
  password: string;
}

export interface IPostRecoveryByEmail {
  email: string;
}
export interface IPostResetPassword {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string | null;
}

export interface IRecoverPassword {
  email: string;
}

export interface INewPassword {
  new_password1: string;
  new_password2: string;
}

export type TypeTab = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ArrowsNavigation {
  prev: () => void;
  next: () => void;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  id: number;
}

export interface IRegistrationData {
  username?: string;
  name?: string;
  email?: string;
  status?: number;
  mobile_phone?: string;
  work_phone?: string;
  password1?: string;
  password2?: string;
  company?: {
    id?: number | string;
    name?: string;
    trade_type?: 'seller' | 'buyer' | 'seller_and_buyer';
    ownership?: number;
    payer_id?: string;
    legal_address?: string;
    actual_address?: string;
    office_phone?: string;
    office_email?: string;
    country?: number;
  };
  products_for_buy?: IGeneralNomenclatureItem[];
  products_for_sell?: IGeneralNomenclatureItem[];
  products_add?: IGeneralNomenclatureItem[];
}

export interface IRegistrationDataStep1 {
  company?: {
    trade_type?: 'seller' | 'buyer' | 'seller_and_buyer';
  };
}

export interface IRegistrationDataStep2 {
  company: {
    name?: string;
    ownership?: number;
    payer_id?: string;
    legal_address?: string;
    actual_address?: string;
    office_phone?: string;
    office_email?: string;
    country?: number;
  };
}

export interface IRegistrationDataStep3 {
  name?: string;
  email?: string;
  status?: number;
  mobile_phone?: string;
  work_phone?: string;
}

export interface IRegistrationDataStep4 {
  products_for_buy?: IGeneralNomenclatureItem[];
  products_for_sell?: IGeneralNomenclatureItem[];
  products_add: IGeneralNomenclatureItem[];
}

export interface IRegistrationDataStep5 {
  username?: string;
  password1?: string;
  password2?: string;
}
