import axios from './axios';

const BASE_URL = `lot/`;
const TOP_OFFERS = BASE_URL + `top-lots/`;

export const getTopOffers = async () => {
  const res = await axios({
    method: 'get',
    url: TOP_OFFERS,
  });
  return res.data;
};
