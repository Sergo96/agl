import { TokenResult } from '@stripe/stripe-js';

export type ITariffsInfo = {
  available: string;
  cost?: string;
  id: number;
  privileges?: string[];
  title?: string;
  weight?: number;
  expired_at?: string;
};

export interface IGetTariffsInfo {
  results: ITariffsInfo[];
}

export type IPostPaymentMethod = {
  stripeToken: TokenResult;
  tariffId: number;
};
