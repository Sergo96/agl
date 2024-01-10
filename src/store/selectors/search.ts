import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { ISearchState } from 'reducers/search';

const getState = (state: IAysAgroState): ISearchState => state.search;

export const searchNomenclatureSelector = createSelector([getState], (state) => state.nomenclature);
