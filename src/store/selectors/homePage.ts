import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { IHomePageState } from 'reducers/homePage';

const getState = (state: IAysAgroState): IHomePageState => state.homePageData;

export const homePageDataSelector = createSelector([getState], (state) => {
  return state.homePageData;
});