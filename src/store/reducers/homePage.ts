import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';
import { IHomePageData } from 'interfaces/homePage';
import { IHomePageDataAction, HomePageTypes } from 'actions/homePage';

export interface IHomePageState {
  isLoading: boolean;
  homePageData: IHomePageData;
}

export const initState: IHomePageState = {
  isLoading: false,
  homePageData: {
    title: '',
    text: '',
    advantages: [],
    conditions: [],
    requirements: [],
    news: []
  }
};

function homePageReducer(state = initState, action: IHomePageDataAction): IHomePageState {
  switch (action.type) {
    case HomePageTypes.LOADING_HOME_PAGE_DATA_REQUEST:
      return { ...state, isLoading: true };
    case HomePageTypes.LOADING_HOME_PAGE_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          homePageData: action.payload
        };
  }
  return state;
}

const homePageReducers = (state: IHomePageState, action: Action) => combineReducers(state, action, homePageReducer);
export default homePageReducers;
