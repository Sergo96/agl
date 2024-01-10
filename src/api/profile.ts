import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { ICompanyProfileInfo, IPostUsername, IUserProfileInfo } from 'interfaces/profile';
import axios from './axios';

export const getCompanyProfileInfo = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/company/retrive/',
  });
  return res.data;
};

export const putCompanyProfileInfo = async (data: ICompanyProfileInfo) => {
  const res = await axios({
    method: 'put',
    url: '/users/company/update/',
    data: data,
  });
  return res.data;
};

export const getUserProfileInfo = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/user/',
  });
  return res.data;
};

export const putUserProfileInfo = async (data: IUserProfileInfo) => {
  const res = await axios({
    method: 'put',
    url: '/users/user/',
    data: data,
  });
  return res.data;
};

export const getProfileDocument = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/document/',
  });
  return res.data;
};

export const postProfileDocument = async (data: FormData) => {
  const res = await axios({
    method: 'post',
    url: '/users/document/',
    data: data,
  });
  return res.data;
};

export const putProfileAvatar = async (data: FormData) => {
  const res = await axios({
    method: 'put',
    url: '/users/company/avatar/',
    data: data,
  });
  return res.data;
};

export const getProfileAvatar = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/company/avatar/',
  });
  return res.data;
};

export const getProfileProductsForBuy = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/product/buy/',
  });
  return res.data;
};

export const putProfileProductsForBuy = async (data: IGeneralNomenclatureItem[]) => {
  const res = await axios({
    method: 'put',
    url: '/users/product/buy/',
    data: {
      products_for_buy: data,
    },
  });
  return res.data;
};

export const getProfileProductsForSell = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/product/sell/',
  });
  return res.data;
};

export const putProfileProductsForSell = async (data: IGeneralNomenclatureItem[]) => {
  const res = await axios({
    method: 'put',
    url: '/users/product/sell/',
    data: {
      products_for_sell: data,
    },
  });
  return res.data;
};

export const getProfileUsername = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/change-username/',
  });
  return res.data;
};

export const putProfileUsernameChange = async (data: IPostUsername) => {
  const res = await axios({
    method: 'put',
    url: '/users/change-username/',
    data: data,
  });
  return res.data;
};