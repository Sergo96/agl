import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';
import PaginationEntry, { EMPTY_PAGINATION_ENTRY } from 'entries/pagination';
import {
  AuctionsTypes,
  IUsersLotStateAction,
  IUsersLotStateByIdAction,
  IUsersLotStateAdditionsAction,
} from 'actions/auctions';
import { ILotsResult, ISearchLots, IExpiredAtTime } from './../../types/interfaces/auctions';
import { TypeTab } from 'interfaces/auth';

export interface IAuctionsState {
  isLoading: boolean;
  tab: TypeTab;
  showSearchLots: boolean;
  userAuctions: PaginationEntry<ILotsResult>;
  lotsInProgress: PaginationEntry<ILotsResult>;
  userCO: PaginationEntry<ILotsResult>;
  responseCO: PaginationEntry<ILotsResult>;
  invites: PaginationEntry<ILotsResult>;
  archive: PaginationEntry<ILotsResult>;
  auctionById: ILotsResult | null;
  auctionInProgressById: ILotsResult | null;
  myCommercialOfferById: ILotsResult | null;
  inviteById: ILotsResult | null;
  archiveById: ILotsResult | null;
  lotsAutocomplateResults: string[];
  searchLots: ISearchLots | null;
  expiredAtList: IExpiredAtTime[];
  userAcceptOffer: boolean;
}

export const initState: IAuctionsState = {
  isLoading: false,
  tab: 1,
  showSearchLots: false,
  userAuctions: EMPTY_PAGINATION_ENTRY,
  lotsInProgress: EMPTY_PAGINATION_ENTRY,
  responseCO: EMPTY_PAGINATION_ENTRY,
  userCO: EMPTY_PAGINATION_ENTRY,
  invites: EMPTY_PAGINATION_ENTRY,
  archive: EMPTY_PAGINATION_ENTRY,
  auctionById: null,
  auctionInProgressById: null,
  myCommercialOfferById: null,
  inviteById: null,
  archiveById: null,
  lotsAutocomplateResults: [],
  searchLots: {
    user_lots: [],
    in_progress: [],
    user_commercial_offers: [],
    user_commercial_offer_answers: [],
    invites: [],
  },
  expiredAtList: [],
  userAcceptOffer: false,
};

function auctionReducer(state = initState, action: IUsersLotStateAction): IAuctionsState {
  switch (action.type) {
    case AuctionsTypes.LOADING_USERS_AUCTIONS_REQUEST:
    case AuctionsTypes.LOADING_LOTS_IN_PROGRESS_REQUEST:
    case AuctionsTypes.LOADING_COMMERCIAL_OFFERS_RESPONSE_REQUEST:
    case AuctionsTypes.LOADING_USER_COMMERCIAL_OFFERS_REQUEST:
    case AuctionsTypes.LOADING_LOTS_INVITES_REQUEST:
    case AuctionsTypes.LOADING_LOTS_ARCHIVE_REQUEST:
    case AuctionsTypes.CREATE_NEW_OFFER_REQUEST:
    case AuctionsTypes.REJECT_INVITE_REQUEST:
      return { ...state, isLoading: true };
    case AuctionsTypes.LOADING_USERS_AUCTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userAuctions: {
          ...state.userAuctions,
          results: action.userAuctions ? action.userAuctions.results : [],
        },
      };
    case AuctionsTypes.LOADING_LOTS_IN_PROGRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lotsInProgress: {
          ...state.lotsInProgress,
          results: action.lotsInProgress ? action.lotsInProgress.results : [],
        },
      };
    case AuctionsTypes.LOADING_USER_COMMERCIAL_OFFERSS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userCO: {
          ...state.userCO,
          results: action.userCO ? action.userCO.results : [],
        },
      };
    case AuctionsTypes.LOADING_COMMERCIAL_OFFERSS_RESPONSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        responseCO: {
          ...state.userCO,
          results: action.responseCO ? action.responseCO.results : [],
        },
      };
    case AuctionsTypes.LOADING_LOTS_INVITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        invites: {
          ...state.invites,
          results: action.invites ? action.invites.results : [],
        },
      };
    case AuctionsTypes.LOADING_LOTS_ARCHIVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        archive: {
          ...state.archive,
          results: action.archive ? action.archive.results : [],
        },
      };
    case AuctionsTypes.DELETE_LOTS_ARCHIVE_SUCCESS: {
      const archive = state.archive.results && [...state.archive.results];
      const actionData = action?.deletedItem && new Set(action.deletedItem);
      const newArchive = archive && archive.filter((i) => !actionData?.has(i.id));
      return {
        ...state,
        isLoading: false,
        archive: {
          ...state.archive,
          results: newArchive,
        },
      };
    }
    case AuctionsTypes.CREATE_AUCTION_SUCCESS: {
      return {
        ...state,
        userAuctions: {
          ...state.userAuctions,
          results: action.newAuction
            ? [...state.userAuctions.results, action.newAuction]
            : [...state.userAuctions.results],
        },
      };
    }
    case AuctionsTypes.CREATE_COMMERCIAL_OFFER_SUCCESS: {
      return {
        ...state,
        userCO: {
          ...state.userCO,
          results: action.newCommercialOffer
            ? [...state.userCO.results, action.newCommercialOffer]
            : [...state.userCO.results],
        },
      };
    }
    case AuctionsTypes.CREATE_NEW_AUCTION_OFFER_SUCCESS: {
      return {
        ...state,
        userAuctions: {
          ...state.userAuctions,
          results: action.newAuction
            ? [...state.userAuctions.results, action.newAuction]
            : [...state.userAuctions.results],
        },
      };
    }
    case AuctionsTypes.ACCEPT_OFFER_SUCCESS: {
      return {...state, userAcceptOffer: true }
     }
    case AuctionsTypes.REJECT_INVITE_SUCCESS: {
      if (action.rejectedInvite) {
        const result = state.invites.results.filter((i) => i.id !== action.rejectedInvite?.lot);
        return {
          ...state,
          invites: {
            ...state.invites,
            results: result,
          },
        };
      }
    }
   
  }
  return state;
}

function auctionAdditionsReducer(state = initState, action: IUsersLotStateAdditionsAction): IAuctionsState {
  switch (action.type) {
    case AuctionsTypes.SEARCH_LOTS_AUTOCOMPLETE_RESULTS_REQUEST:
      return { ...state, isLoading: true };
    case AuctionsTypes.SEARCH_LOTS_AUTOCOMPLETE_RESULTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lotsAutocomplateResults: action.searchAutocompalteLots ? action.searchAutocompalteLots : [],
      };
    case AuctionsTypes.SEARCH_LOTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showSearchLots: true,
        searchLots: action.searchLots ? action.searchLots : null,
      };

    case AuctionsTypes.LOADING_LOT_EXPIRED_AT_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        expiredAtList: action.auctionExpiredAtList ? action.auctionExpiredAtList : [],
      };
    }
    case AuctionsTypes.ON_CHANGE_TAB_SUCCESS:
      return {
        ...state,
        tab: action.tab ? action.tab : 0,
      };
  }
  return state;
}

function auctionByIdReducer(state = initState, action: IUsersLotStateByIdAction): IAuctionsState {
  switch (action.type) {
    case AuctionsTypes.LOADING_AUCTION_BY_ID_REQUEST:
    case AuctionsTypes.LOADING_AUCTION_IN_PROGRESS_BY_ID_REQUEST:
    case AuctionsTypes.LOADING_MY_COMMERCIAL_OFFERS_BY_ID_REQUEST:
    case AuctionsTypes.LOADING_INVITES_BY_ID_REQUEST:
      return { ...state, isLoading: true };

    case AuctionsTypes.LOADING_AUCTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        auctionById: action.auctionById ? action.auctionById : null,
      };
    case AuctionsTypes.LOADING_AUCTION_IN_PROGRESS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        auctionInProgressById: action.auctionInProgressById ? action.auctionInProgressById : null,
      };
    case AuctionsTypes.LOADING_MY_COMMERCIAL_OFFERS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myCommercialOfferById: action.myCommercialOfferById ? action.myCommercialOfferById : null,
      };
    case AuctionsTypes.LOADING_INVITES_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        inviteById: action.inviteById ? action.inviteById : null,
      };
    case AuctionsTypes.LOADING_ARCHIVE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        archiveById: action.archiveById ? action.archiveById : null,
      };
  }
  return state;
}

const auctionsReducers = (state: IAuctionsState, action: Action) =>
  combineReducers(state, action, auctionReducer, auctionByIdReducer, auctionAdditionsReducer);
export default auctionsReducers;
