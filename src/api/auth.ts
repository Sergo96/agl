import axios from './axios';
import { IPostLogin, IPostRecoveryByEmail, IPostResetPassword, IRegistrationData } from 'interfaces/auth';

export const postLoginUser = async (data: IPostLogin) => {
  const res = await axios({
    method: 'post',
    url: '/users/auth/login/',
    data: {
      username: data.username,
      password: data.password,
    },
  });
  return res.data;
};

export const postRecoveryByEmail = async (data: IPostRecoveryByEmail) => {
  const res = await axios({
    method: 'post',
    url: '/users/auth/password/reset/',
    data: {
      email: data.email,
    },
  });
  return res.data;
};

export const postResetPassword = async (data: IPostResetPassword) => {
  const res = await axios({
    method: 'post',
    url: '/users/auth/password/reset/confirm/',
    data: {
      new_password1: data.new_password1,
      new_password2: data.new_password2,
      token: `Token ${data.token}`,
      uid: 'NA',
    },
  });
  return res.data;
};

export const postRegisterUser = async (data: IRegistrationData) => {
  const res = await axios({
    method: 'post',
    url: '/users/registration/',
    data: data,
  });
  return res.data;
};

export const getUserInfo = async () => {
  const res = await axios({
    method: 'get',
    url: '/users/auth/user/',
  });
  return res.data;
};

export const postConfirmEmail = async (data: string | string[]) => {
  const res = await axios({
    method: 'post',
    url: 'users/auth/account-confirm-email/',
    data: {
      key: data,
    },
  });
  return res.data;
};
