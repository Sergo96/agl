import axios from './axios';

const BASE_URL = `main/`;

export const OWNERSHIP_LIST = BASE_URL + 'ownership-list/';
export const STATUS_LIST = BASE_URL + 'status-list/';
export const UNITS_LIST = BASE_URL + 'units-list/';

export const getCountryList = async (isAvailableForUser: boolean) => {
  const res = await axios({
    method: 'get',
    url: `main/country-list/?available_for_user=${isAvailableForUser}`,
  });
  return res.data;
};

export const getOwnershipList = async () => {
  const res = await axios({
    method: 'get',
    url: OWNERSHIP_LIST,
  });
  return res.data;
};

export const getStatusList = async () => {
  const res = await axios({
    method: 'get',
    url: STATUS_LIST,
  });
  return res.data;
};

export const getUnitsList = async () => {
  const res = await axios({
    method: 'get',
    url: UNITS_LIST,
  });
  return res.data;
};
