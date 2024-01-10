import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_en from './locales/en/common.json';
import common_ru from './locales/ru/common.json';
import common_ua from './locales/ua/common.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: 'ru',
    resources: {
      en: {
        common: common_en,
      },
      ru: {
        common: common_ru,
      },
      ua: {
        common: common_ua,
      },
    },
  });

export default i18next;
