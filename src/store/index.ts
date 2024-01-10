import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducers, { initState as authState, IAuthState } from 'reducers/auth';
import generalReducer, { IGeneralState, initState as generalState } from 'reducers/general';
import notificationsReducer, { initState as notificationsState, INotificationsState } from 'reducers/notifications';
import searchReducer, { initState as searchState, ISearchState } from 'reducers/search';
import productsReducers, { initState as productState, IProductsState } from 'reducers/products';
import nomenclatureReducers, { initState as nomenclatureState, INomenclatureState } from 'reducers/nomenclature';
import baseInfoReducer, { initState as baseInfoState, IBaseInfoState } from 'reducers/baseInfo';
import homePageReducers, { initState as homePageState, IHomePageState } from 'reducers/homePage';
import topOffersReducers, { initState as topOffersState, ITopOffersState } from 'reducers/topOffers';
import auctionsReducers, { initState as auctionsState, IAuctionsState } from './reducers/auctions';
import profileReducers, { initState as profileState, IProfileState } from 'reducers/profile';
import subscriptionsReducers, { initState as subscriptionsState, ISubscriptionsState } from 'reducers/subscriptions';
import { ILogisticsState, initState as logisticsState, logisticsReducer } from 'reducers/logistics';
import customCurrentProductsReducers, {
  initState as customCurrentProductsState,
  ICustomCurrentProductsState,
} from 'reducers/customCurrentProducts';
import filtrationReducers, { initState as filtrationState, IFiltrationState } from 'reducers/filtration';
import companyReducers, { initState as companyState, ICompanyState } from 'reducers/company';

export interface IAysAgroState {
  auth: IAuthState;
  general: IGeneralState;
  notifications: INotificationsState;
  search: ISearchState;
  products: IProductsState;
  nomenclature: INomenclatureState;
  baseInfo: IBaseInfoState;
  homePageData: IHomePageState;
  topOffers: ITopOffersState;
  profile: IProfileState;
  auctions: IAuctionsState;
  subscriptions: ISubscriptionsState;
  logistics: ILogisticsState;
  customCurrentProducts: ICustomCurrentProductsState;
  filtration: IFiltrationState;
  company: ICompanyState;
}

const initState: IAysAgroState = {
  auth: authState,
  general: generalState,
  notifications: notificationsState,
  search: searchState,
  products: productState,
  nomenclature: nomenclatureState,
  baseInfo: baseInfoState,
  homePageData: homePageState,
  topOffers: topOffersState,
  profile: profileState,
  auctions: auctionsState,
  subscriptions: subscriptionsState,
  logistics: logisticsState,
  customCurrentProducts: customCurrentProductsState,
  filtration: filtrationState,
  company: companyState,
};

const reducers = combineReducers({
  auth: authReducers,
  general: generalReducer,
  notifications: notificationsReducer,
  search: searchReducer,
  products: productsReducers,
  nomenclature: nomenclatureReducers,
  baseInfo: baseInfoReducer,
  homePageData: homePageReducers,
  topOffers: topOffersReducers,
  profile: profileReducers,
  auctions: auctionsReducers,
  subscriptions: subscriptionsReducers,
  logistics: logisticsReducer,
  customCurrentProducts: customCurrentProductsReducers,
  filtration: filtrationReducers,
  company: companyReducers,
});

const store = createStore(reducers, initState, composeWithDevTools(applyMiddleware(thunk)));
export default store;
