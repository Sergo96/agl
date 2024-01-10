import { Language } from 'interfaces/general';

export const AUTHENTICATION = 'Authentication';
const LANGUAGE = 'i18nextLng';

export const getLanguage = (): Language => {
  const defaultLang: Language = 'ru';
  const authentication = typeof window !== 'undefined' ? (localStorage.getItem(LANGUAGE) as Language) : defaultLang;
  return authentication ? authentication : defaultLang;
};

export const authentication = (): string => {
  const authentication = typeof window !== 'undefined' ? localStorage.getItem(AUTHENTICATION) : '';
  return authentication ? authentication : '';
};

export const setAuthentication = (key: string) => {
  localStorage.setItem(AUTHENTICATION, key);
};

export const deleteAuthentication = () => {
  localStorage.removeItem(AUTHENTICATION);
};

export const setLanguage = (lang: string) => {
  localStorage.setItem(LANGUAGE, lang);
};
