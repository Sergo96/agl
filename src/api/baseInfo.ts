import axios from './axios';

export const getBaseInfo = async () => {
  const res = await axios({
    method: 'get',
    url: `info/base-info/`,
  });
  return res.data;
};
