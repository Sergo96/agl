import axios from './axios';
import { ILotsParams, ICreateLot } from 'interfaces/auctions';

const BASE_URL = `lot/`;
const CUSTOM_CURRENT_PRODUCTS = BASE_URL + 'all-current-item/';
const CUSTOM_CURRENT_PRODUCTS_FOR_BUY = CUSTOM_CURRENT_PRODUCTS + 'for_buy/';
const CUSTOM_CURRENT_PRODUCTS_FOR_SELL = CUSTOM_CURRENT_PRODUCTS + 'for_sell/';
const MY_CUSTOM_CURRENT_ITEMS = BASE_URL + 'my-current-item/';

export const getCustomCurrentProductsForSell = async (params: ILotsParams) => {
  const res = await axios({
    method: 'get',
    url: CUSTOM_CURRENT_PRODUCTS_FOR_SELL,
    params,
  });
  return res.data;
};

export const getCustomCurrentProductsForBuy = async (params: ILotsParams) => {
  const res = await axios({
    method: 'get',
    url: CUSTOM_CURRENT_PRODUCTS_FOR_BUY,
    params,
  });
  return res.data;
};

export const getMyCustomCurrentProducts = async (params: ILotsParams) => {
  const res = await axios({
    method: 'get',
    url: MY_CUSTOM_CURRENT_ITEMS,
    params,
  });
  return res.data;
};

export const postMyCustomCurrentProduct = async (data: ICreateLot) => {
  const res = await axios({
    method: 'post',
    url: MY_CUSTOM_CURRENT_ITEMS,
    data: data,
  });
  return res.data;
};
