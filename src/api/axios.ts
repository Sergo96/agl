import axiosDefault from 'axios';
import { DEFAULT_URL } from 'constants/request';
import { toAysAgroError } from 'helpers/errors';
import { AUTHENTICATION, getLanguage } from 'storage/localStorage';

const axios = axiosDefault.create({
  baseURL: DEFAULT_URL,
});

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(AUTHENTICATION);
    const language = getLanguage();

    if (token != null) {
      config.headers.Authorization = 'Token ' + token;
    }

    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept-Language'] = language;

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    throw toAysAgroError(error);
  }
);

export default axios;
