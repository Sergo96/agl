import axios from './axios';

export const getProducts = async () => {
  const res = await axios({
    method: 'get',
    url: 'catalog/category/',
  });
  return res.data;
};
