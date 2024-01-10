import { AxiosError } from 'axios';
import AysAgroError, { ЕrrorFieldDetailEntry } from 'entries/errors';
import { UNKNOWN_ERROR_STATUS } from 'utils/constants/errors';

export const toErrorMessage = (error?: AysAgroError) => {
  return error ? error.message : undefined;
};

export const toErrorDetails = (error?: AysAgroError) => {
  return error && error.details ? error.details : [];
};

export const toAysAgroError = (e: any): AysAgroError => {
  if (e.isAxiosError) {
    const error = e as AxiosError;
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      if (data) {
        const message = data.error;
        const details = data.details;
        return new AysAgroError(message, status, details);
      }
      const message = e.message ? e.message : `Произошла неизвестная ошибка`;
      return new AysAgroError(message, status);
    }
  }

  let message = e.message ? e.message : `Произошла неизвестная ошибка`;
  if ('Network Error' == message) message = `Ошибка связи. Попробуйте позже`;
  return new AysAgroError(message, UNKNOWN_ERROR_STATUS);
};

export const newAysAgroErrorStatus400 = (message: string, details?: Array<ЕrrorFieldDetailEntry>) => {
  return new AysAgroError(message, 400, details);
};
