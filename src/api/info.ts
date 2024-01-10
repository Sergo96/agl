import axios from './axios';

const BASE_URL = `info/`;
const MAIN_INFO = BASE_URL + `main-info/`;

export const getHomePageData = async () => {
  const res = await axios({
    method: 'get',
    url: MAIN_INFO,
  });
  return res.data;
};
