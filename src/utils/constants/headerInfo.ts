import { IHeaderInfo } from 'interfaces/headerInfo';

export const headerInfo: IHeaderInfo = {
  navList: [
    {
      i18nTitle: 'header.nav.currentProducts',
      url: '/products',
    },
    {
      i18nTitle: 'header.nav.buy',
      url: '/create-lot-to-buy',
    },
    {
      i18nTitle: 'header.nav.sell',
      url: '/create-lot-to-sell',
    },
    {
      i18nTitle: 'header.nav.auctions',
      url: '/auctions',
    },
    {
      i18nTitle: 'header.nav.logistics',
      url: '/logistics',
    },
    {
      i18nTitle: 'header.nav.analytics',
      url: '/analytics',
    },
    {
      i18nTitle: 'header.nav.news',
      url: '/news',
    },
    {
      i18nTitle: 'header.nav.support',
      url: '/support',
    },
  ],
  currencyOptions: [
    { value: 'usd', label: 'USD' },
    { value: 'eur', label: 'EUR' },
    { value: 'byn', label: 'BYN' },
    { value: 'uah', label: 'UAH' },
  ],
  languageOptions: [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
    { value: 'ua', label: 'Українська' },
  ],
  homePageNav: [
    {
      i18nTitle: 'homePage.nav.tradeOnAgro24',
      url: '#tradeOnAgro24',
    },
    {
      i18nTitle: 'homePage.nav.participationConditions',
      url: '#participationConditions',
    },
    {
      i18nTitle: 'homePage.nav.topOffers',
      url: '#topOffers',
    },
    {
      i18nTitle: 'homePage.nav.catalog',
      url: '#catalog',
    },
    {
      i18nTitle: 'homePage.nav.news',
      url: '#news',
    },
    {
      i18nTitle: 'homePage.nav.contacts',
      url: '#contacts',
    },
  ],
};
