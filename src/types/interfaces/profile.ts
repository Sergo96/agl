import { UploadChangeParam } from 'antd/lib/upload';
import { IBaseDTO, ICountry } from './general';

export interface ICompanyProfileInfo {
  name: string;
  trade_type: 'seller' | 'buyer' | 'seller_and_buyer';
  country: ICountry;
  field_of_activity: string;
  ownership: IBaseDTO;
  date_create: number;
  legal_address: string;
  actual_address: string;
  payer_id: string;
  office_phone: string;
  office_email: string;
  description_company: string;
}

export interface IUserProfileInfo {
  name: string;
  email: string;
  status: IBaseDTO;
  mobile_phone: string;
  work_phone: string;
}

export interface IAvatar {
  avatar: string;
  id: number;
}

export interface IAvatar {
  avatar: string;
  id: number;
}
export interface IDocument {
  document: string;
  id: number;
}

export interface IPostUsername {
  username: string;
  password: string;
  password_confirm: string;
}

export interface IPostAvatar {
  avatarFile?: UploadChangeParam;
}

export interface IPostDocument {
  document?: UploadChangeParam;
}
