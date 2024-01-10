import axios from './axios';

export const getSearchNomencalture = async (value: string) => {
  const res = await axios({
    method: 'get',
    url: `catalog/nomenclature/?search=${value}`,
  });
  return res.data;
};
