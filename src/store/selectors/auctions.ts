import { IAuctionsState } from './../reducers/auctions';
import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';

const getState = (state: IAysAgroState): IAuctionsState => state.auctions;

export const userAuctionsSelector = createSelector([getState], (state) => {
  return state.userAuctions.results;
});

export const lotsAutocompleteSelector = createSelector([getState], (state) => {
  return state.lotsAutocomplateResults;
});

export const auctionByIdSelector = createSelector([getState], (state) => {
  return state.auctionById;
});

export const auctionInProgressByIdSelector = createSelector([getState], (state) => {  
  return state.auctionInProgressById;
});

export const myCommerciallOfferByIdSelector = createSelector([getState], (state) => {
  return state.myCommercialOfferById;
});

export const inviteByIdSelector = createSelector([getState], (state) => {
  return state.inviteById;
});

export const archiveByIdSelector = createSelector([getState], (state) => {
  return state.archiveById;
});

export const searchLotsSelector = createSelector([getState], (state) => {
  return state.searchLots;
});

export const auctionsInProgressSelector = createSelector([getState], (state) => {
  return state.lotsInProgress.results
})

export const userCOSelector = createSelector([getState], (state) => {
  return state.userCO.results
})

export const responceCOSelector = createSelector([getState], (state) => {
  return state.responseCO.results
})

export const invitesLotsSelector = createSelector([getState], (state) => {
  return state.invites.results
})

export const archiveLotsSelector = createSelector([getState], (state) => {
  return state.archive.results
})

export const auctionsExpiredAtListSelector = createSelector([getState], (state) => {
  return state.expiredAtList;
});