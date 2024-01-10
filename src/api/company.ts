import axios from './axios';

const BASE_URL = `users/`;
const COMPANY_DATA = BASE_URL + `company/`

export const getCompanyById = async (id: number) => {
  const res = await axios({
    method: 'get',
    url: `${COMPANY_DATA}${id}`
  
  });
  return res.data;
};

