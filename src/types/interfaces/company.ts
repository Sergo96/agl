import { IBaseDTO, ICountry, TradeType } from "./general";

export interface ICompanyData {
  id: number,
  name: string,
  logo: string | null,
  trade_type: TradeType,
  ownership: IBaseDTO,
  payer_id: string,
  legal_address: string,
  actual_address: string,
  office_phone: string,
  office_email: string,
  field_of_activity: string | null,
  date_create: string,
  description_company: string | null,
  country: ICountry
}