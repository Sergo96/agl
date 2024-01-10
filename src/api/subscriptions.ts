import { IPostPaymentMethod } from 'interfaces/subscriptions';
import axios from './axios';

export const getTariffs = async () => {
  const res = await axios({
    method: 'get',
    url: '/info/tariffs/',
  });
  return res.data;
};

export const getCurrentTariff = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/current-tariff/',
  });
  return res.data;
};

export const postPayments = async (data: IPostPaymentMethod) => {
  const res = await axios({
    method: 'post',
    url: '/payments/pay/',
    data: {
      key: data?.stripeToken?.token?.id,
      tariff: data.tariffId,
    },
  });
  return res.data;
};
