import axios from './axios';

export const getTransportCompaniesData = async () => {
  const res = await axios({
    method: 'get',
    url: `/info/transport-companies/`,
  });
  return res.data;
};
