import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { INomenclatureState } from 'reducers/nomenclature';

const getState = (state: IAysAgroState): INomenclatureState => state.nomenclature;

export const nomenclatureByIdSelector = createSelector([getState], (state) => {
  return state.products_for_buy_add.results;
});

export const nomenclatureSelector = createSelector([getState], (state) => {
  return state.nomenclature
});