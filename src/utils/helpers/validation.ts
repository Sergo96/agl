import * as Yup from 'yup';

export const buildRequired = (value: number, requiredText: string) => ({
  is: value,
  then: Yup.string().required(requiredText),
});