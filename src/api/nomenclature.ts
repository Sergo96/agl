import axios from './axios';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';

export const getAllNomenclature = async () => {
  const res = await axios({
    method: 'get',
    url: 'catalog/nomenclature/',
  });
  return res.data;
};

export const getNomenclatureById = async (id: number) => {
  const res = await axios({
    method: 'get',
    url: `catalog/nomenclature/?category=${id}`,
  });
  return res.data;
};

export const postCustomNomenclature = async (data: IGeneralNomenclatureItem) => {
  const res = await axios({
    method: 'post',
    url: `/catalog/nomenclature/`,
    data: data,
  });
  return res.data;
};
