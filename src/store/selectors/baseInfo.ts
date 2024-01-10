import { IBaseInfoState } from 'reducers/baseInfo';
import { createSelector } from 'reselect';
import { IAysAgroState } from 'store';

const getState = (state: IAysAgroState): IBaseInfoState => state.baseInfo;

export const headerBaseInfoSelector = createSelector([getState], (state) => state.baseInfo.header);

export const footerBaseInfoSelector = createSelector([getState], (state) => state.baseInfo.footer);
