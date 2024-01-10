import { ReactText } from 'react';
import {
  getLotInvitesById,
  deleteLotArchives,
  getLotArchiveById,
  postMyAuction,
  postMyCommercialOffer,
  getAuctionsExpiredAtList,
  postAuctionParticipate,
  postRejectAuctionInvite,
  postCancelMyAuction,
  getAllMyOffers,
  patchAuctionParticipate,
  patchAcceptOffer,
} from './../../api/auctions';
import { ActionCreator, Action, Dispatch } from 'redux';
import { dispatchError, dispatchNotification } from './notifications';
import IErrorAction from 'interfaces/errors';
import {
  ILotsResult,
  ILotsParams,
  ISearchLots,
  ILots,
  ICreateLot,
  IExpiredAtTime,
  IRejectedLot,
  IMyOffer,
  IOffer,
} from 'interfaces/auctions';
import {
  getUsersAuctionsData,
  getAuctionDataById,
  getSearchLotsAutocomplete,
  getSearchLots,
  getLotsInProgress,
  getUserCommercialOffers,
  getCommercialOffersResponse,
  getLotsInvites,
  getArchivedAuctions,
  getAuctionInProgressById,
  getMyCommercialOfferById,
} from 'api/auctions';
import { IAysAgroState } from 'store';
import { TypeOperation, NotificationType } from 'interfaces/general';
import { TypeTab } from 'interfaces/auth';
import { makeSuccessNotificationEntry } from 'entries/notifications';

export enum AuctionsTypes {
  LOADING_USERS_AUCTIONS_REQUEST = 'LOADING_USERS_AUCTIONS_REQUEST',
  LOADING_USERS_AUCTIONS_SUCCESS = 'LOADING_USERS_AUCTIONS_SUCCESS',
  LOADING_LOTS_IN_PROGRESS_REQUEST = 'LOADING_LOTS_IN_PROGRESS_REQUEST',
  LOADING_LOTS_IN_PROGRESS_SUCCESS = 'LOADING_LOTS_IN_PROGRESS_SUCCESS',
  LOADING_USER_COMMERCIAL_OFFERS_REQUEST = 'LOADING_USER_COMMERCIAL_OFFERS_REQUEST',
  LOADING_USER_COMMERCIAL_OFFERSS_SUCCESS = 'LOADING_USER_COMMERCIAL_OFFERSS_SUCCESS',
  LOADING_COMMERCIAL_OFFERS_RESPONSE_REQUEST = 'LOADING_COMMERCIAL_OFFERS_RESPONSE_REQUEST',
  LOADING_COMMERCIAL_OFFERSS_RESPONSE_SUCCESS = 'LOADING_COMMERCIAL_OFFERS_RESPONSE_SUCCESS',
  LOADING_LOTS_INVITES_REQUEST = 'LOADING_LOTS_INVITES_REQUEST',
  LOADING_LOTS_INVITES_SUCCESS = 'LOADING_LOTS_INVITES_SUCCESS',
  LOADING_LOTS_ARCHIVE_REQUEST = 'LOADING_LOTS_ARCHIVE_REQUEST',
  LOADING_LOTS_ARCHIVE_SUCCESS = 'LOADING_LOTS_ARCHIVE_SUCCESS',

  SEARCH_LOTS_AUTOCOMPLETE_RESULTS_REQUEST = 'SEARCH_LOTS_AUTOCOMPLETE_RESULTS_REQUEST',
  SEARCH_LOTS_AUTOCOMPLETE_RESULTS_SUCCESS = 'SEARCH_LOTS_AUTOCOMPLETE_RESULTS_SUCCESS',
  SEARCH_LOTS_REQUEST = 'SEARCH_LOTS_REQUEST',
  SEARCH_LOTS_SUCCESS = 'SEARCH_LOTS_SUCCESS',

  LOADING_AUCTION_BY_ID_REQUEST = 'LOADING_AUCTION_BY_ID_REQUEST',
  LOADING_AUCTION_BY_ID_SUCCESS = 'LOADING_AUCTION_BY_ID_SUCCESS',

  LOADING_AUCTION_IN_PROGRESS_BY_ID_REQUEST = 'LOADING_AUCTION_IN_PROGRESS_BY_ID_REQUEST',
  LOADING_AUCTION_IN_PROGRESS_BY_ID_SUCCESS = 'LOADING_AUCTION_IN_PROGRESS_BY_ID_SUCCESS',

  LOADING_MY_COMMERCIAL_OFFERS_BY_ID_REQUEST = 'LOADING_MY_COMMERCIAL_OFFERS_BY_ID_REQUEST',
  LOADING_MY_COMMERCIAL_OFFERS_BY_ID_SUCCESS = 'LOADING_MY_COMMERCIAL_OFFERS_BY_ID_SUCCESS',

  LOADING_INVITES_BY_ID_REQUEST = 'LOADING_INVITES_BY_ID_REQUEST',
  LOADING_INVITES_BY_ID_SUCCESS = 'LOADING_INVITES_BY_ID_SUCCESS',

  LOADING_ARCHIVE_BY_ID_REQUEST = 'LOADING_ARCHIVE_BY_ID_REQUEST',
  LOADING_ARCHIVE_BY_ID_SUCCESS = 'LOADING_ARCHIVE_BY_ID_SUCCESS',

  DELETE_LOTS_ARCHIVE_REQUEST = 'DELETE_LOTS_ARCHIVE_REQUEST',
  DELETE_LOTS_ARCHIVE_SUCCESS = 'DELETE_LOTS_ARCHIVE_SUCCESS',

  CREATE_LOT_REQUEST = 'CREATE_LOT_REQUEST',
  CREATE_AUCTION_SUCCESS = 'CREATE_AUCTION_SUCCESS',
  CREATE_COMMERCIAL_OFFER_SUCCESS = 'CREATE_COMMERCIAL_OFFER_SUCCESS',

  LOADING_LOT_EXPIRED_AT_LIST_REQUEST = 'LOADING_LOT_EXPIRED_AT_LIST_REQUEST',
  LOADING_LOT_EXPIRED_AT_LIST_SUCCESS = 'LOADING_LOT_EXPIRED_AT_LIST_SUCCESS',

  CREATE_NEW_OFFER_REQUEST = 'CREATE_NEW_OFFER_REQUEST',
  CREATE_NEW_AUCTION_OFFER_SUCCESS = 'CREATE_NEW_AUCTION_OFFER_SUCCESS',
  CREATE_NEW_COMMERCIAL_OFFER_OFFER_SUCCESS = 'CREATE_NEW_COMMERCIAL_OFFER_OFFER_SUCCESS',

  REJECT_INVITE_REQUEST = 'REJECT_INVITE_REQUEST',
  REJECT_INVITE_SUCCESS = 'REJECT_INVITE_SUCCESS',

  ACCEPT_OFFER_REQUEST = 'ACCEPT_OFFER_REQUEST',
  ACCEPT_OFFER_SUCCESS = 'ACCEPT_OFFER_SUCCESS',

  LOADING_LOTS_ERROR = 'LOADING_LOTS_ERROR',

  ON_CHANGE_TAB_SUCCESS = 'ON_CHANGE_TAB_SUCCESS',
}

export interface IUsersLotStateAction extends IErrorAction {
  userAuctions?: ILots;
  lotsInProgress?: ILots;
  userCO?: ILots;
  responseCO?: ILots;
  invites?: ILots;
  archive?: ILots;
  deletedItem?: ReactText[];
  newAuction?: ILotsResult;
  newItem?: ILotsResult;
  newCommercialOffer?: ILotsResult;
  newAuctionOffer?: ILotsResult;
  newCommercialOfferOffer?: ILotsResult;
  rejectedInvite?: IRejectedLot;
}

export interface IUsersLotStateByIdAction extends IErrorAction {
  auctionById?: ILotsResult;
  auctionInProgressById?: ILotsResult;
  myCommercialOfferById?: ILotsResult;
  commercialOffersResponseById?: ILotsResult;
  inviteById?: ILotsResult;
  archiveById?: ILotsResult;
}

export interface IUsersLotStateAdditionsAction extends IErrorAction {
  filterParams?: ILotsParams[];
  searchAutocompalteLots?: string[];
  searchLots?: ISearchLots;
  auctionExpiredAtList?: IExpiredAtTime[];
  tab?: TypeTab;
}

const loadingUsersAuctionsRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_USERS_AUCTIONS_REQUEST };
};

const loadingUsersAuctionsSuccess: ActionCreator<IUsersLotStateAction> = (userAuctions: ILots) => {
  return { type: AuctionsTypes.LOADING_USERS_AUCTIONS_SUCCESS, userAuctions };
};

const loadingLotsError: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_LOTS_ERROR };
};

export const loadingUsersAuctions = (value: ILotsParams) => {
  return async (dispatch: Dispatch, getState: () => IAysAgroState) => {
    const state = getState();
    const params = { ...value, company: state.auth.userRegInfo.company?.id };
    dispatch(loadingUsersAuctionsRequest());
    try {
      const data = await getUsersAuctionsData(params);
      dispatch(loadingUsersAuctionsSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingAuctionByIdRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_AUCTION_BY_ID_REQUEST };
};

const loadingAuctionByIdSuccess: ActionCreator<IUsersLotStateByIdAction> = (
  auctionById: ILotsResult
): IUsersLotStateByIdAction => {
  return { type: AuctionsTypes.LOADING_AUCTION_BY_ID_SUCCESS, auctionById };
};

export const loadingAuctionById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingAuctionByIdRequest());
    try {
      const data = await getAuctionDataById(id);
      dispatch(loadingAuctionByIdSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingAuctionInProgressByIdRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_AUCTION_IN_PROGRESS_BY_ID_REQUEST };
};

const loadingAuctionInProgressByIdSuccess: ActionCreator<IUsersLotStateByIdAction> = (
  auctionInProgressById: ILotsResult
): IUsersLotStateByIdAction => {
  return { type: AuctionsTypes.LOADING_AUCTION_IN_PROGRESS_BY_ID_SUCCESS, auctionInProgressById };
};

export const loadingAuctionInProgressById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingAuctionInProgressByIdRequest());
    try {
      const data = await getAuctionInProgressById(id);
      dispatch(loadingAuctionInProgressByIdSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadinMyCommercialOfferByIdRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_MY_COMMERCIAL_OFFERS_BY_ID_REQUEST };
};

const loadinMyCommercialOfferByIdSuccess: ActionCreator<IUsersLotStateByIdAction> = (
  myCommercialOfferById: ILotsResult
): IUsersLotStateByIdAction => {
  return { type: AuctionsTypes.LOADING_MY_COMMERCIAL_OFFERS_BY_ID_SUCCESS, myCommercialOfferById };
};

export const loadinMyCommercialOfferById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadinMyCommercialOfferByIdRequest());
    try {
      const data = await getMyCommercialOfferById(id);
      dispatch(loadinMyCommercialOfferByIdSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingInviteByIdRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_INVITES_BY_ID_REQUEST };
};

const loadingInviteByIdSuccess: ActionCreator<IUsersLotStateByIdAction> = (
  inviteById: ILotsResult
): IUsersLotStateByIdAction => {
  return { type: AuctionsTypes.LOADING_INVITES_BY_ID_SUCCESS, inviteById };
};

export const loadingInviteById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingInviteByIdRequest());
    try {
      const data = await getLotInvitesById(id);
      dispatch(loadingInviteByIdSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingArchiveByIdRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_ARCHIVE_BY_ID_REQUEST };
};

const loadingArchiveByIdSuccess: ActionCreator<IUsersLotStateByIdAction> = (
  archiveById: ILotsResult
): IUsersLotStateByIdAction => {
  return { type: AuctionsTypes.LOADING_ARCHIVE_BY_ID_SUCCESS, archiveById };
};

export const loadingArchiveById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingArchiveByIdRequest());
    try {
      const data = await getLotArchiveById(id);
      dispatch(loadingArchiveByIdSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const searchLotsAutocompleteRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.SEARCH_LOTS_AUTOCOMPLETE_RESULTS_REQUEST };
};

const searchLotsAutocompleteSuccess: ActionCreator<IUsersLotStateAdditionsAction> = (
  searchAutocompalteLots: string[]
): IUsersLotStateAdditionsAction => {
  return { type: AuctionsTypes.SEARCH_LOTS_AUTOCOMPLETE_RESULTS_SUCCESS, searchAutocompalteLots };
};

export const searchLotsAutocomplete = (value: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(searchLotsAutocompleteRequest());
    try {
      const data = await getSearchLotsAutocomplete(value);
      dispatch(searchLotsAutocompleteSuccess(data.results));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const searchLotsRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.SEARCH_LOTS_REQUEST };
};

const searchLotsSuccess: ActionCreator<IUsersLotStateAdditionsAction> = (
  searchLots: ISearchLots
): IUsersLotStateAdditionsAction => {
  return { type: AuctionsTypes.SEARCH_LOTS_SUCCESS, searchLots };
};

export const searchLots = (value: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(searchLotsRequest());
    try {
      const data = await getSearchLots(value);
      dispatch(searchLotsSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingLotsInProgressRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_LOTS_IN_PROGRESS_REQUEST };
};

const loadingLotsInProgressSuccess: ActionCreator<IUsersLotStateAction> = (lotsInProgress): IUsersLotStateAction => {
  return { type: AuctionsTypes.LOADING_LOTS_IN_PROGRESS_SUCCESS, lotsInProgress };
};

export const loadingLotsInProgress = (params: ILotsParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingLotsInProgressRequest());
    try {
      const data = await getLotsInProgress(params);
      dispatch(loadingLotsInProgressSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingUserCommercialOffersRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_USER_COMMERCIAL_OFFERS_REQUEST };
};

const loadingUserCommercialOffersSuccess: ActionCreator<IUsersLotStateAction> = (userCO): IUsersLotStateAction => {
  return { type: AuctionsTypes.LOADING_USER_COMMERCIAL_OFFERSS_SUCCESS, userCO };
};

export const loadingUserCommercialOffers = (params: ILotsParams) => {
  return async (dispatch: Dispatch, getState: () => IAysAgroState) => {
    const state = getState();
    const data = { ...params, company: state.auth.userRegInfo.company?.id };
    dispatch(loadingUserCommercialOffersRequest());
    try {
      const result = await getUserCommercialOffers(data);
      dispatch(loadingUserCommercialOffersSuccess(result));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingCommercialOffersResponseRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_COMMERCIAL_OFFERS_RESPONSE_REQUEST };
};

const loadingCommercialOffersResponseSuccess: ActionCreator<IUsersLotStateAction> = (
  responseCO
): IUsersLotStateAction => {
  return { type: AuctionsTypes.LOADING_COMMERCIAL_OFFERSS_RESPONSE_SUCCESS, responseCO };
};

export const loadingCommercialOffersResponse = (params: ILotsParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingCommercialOffersResponseRequest());
    try {
      const result = await getCommercialOffersResponse(params);
      dispatch(loadingCommercialOffersResponseSuccess(result));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingLostInvitesRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_LOTS_INVITES_REQUEST };
};

const loadingLostInvitesSuccess: ActionCreator<IUsersLotStateAction> = (invites): IUsersLotStateAction => {
  return { type: AuctionsTypes.LOADING_LOTS_INVITES_SUCCESS, invites };
};

export const loadingLotsInvites = (params: ILotsParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingLostInvitesRequest());
    try {
      const result = await getLotsInvites(params);
      dispatch(loadingLostInvitesSuccess(result));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingArchiveRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_LOTS_ARCHIVE_REQUEST };
};

const loadingArchiveSuccess: ActionCreator<IUsersLotStateAction> = (archive): IUsersLotStateAction => {
  return { type: AuctionsTypes.LOADING_LOTS_ARCHIVE_SUCCESS, archive };
};

export const loadingLotsArchive = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingArchiveRequest());
    try {
      const data = await getArchivedAuctions();
      dispatch(loadingArchiveSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const deleteLotsArchiveRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.DELETE_LOTS_ARCHIVE_REQUEST };
};

const deleteLotsArchiveSuccess: ActionCreator<IUsersLotStateAction> = (
  deletedItem: ReactText[]
): IUsersLotStateAction => {
  return { type: AuctionsTypes.DELETE_LOTS_ARCHIVE_SUCCESS, deletedItem };
};

export const deleteLotsArchiveArray = (data: ReactText[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteLotsArchiveRequest());
    try {
      await deleteLotArchives(data);
      dispatch(deleteLotsArchiveSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const createLotRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.CREATE_LOT_REQUEST };
};

const createAuctionSuccess: ActionCreator<IUsersLotStateAction> = (newAuction: ILotsResult): IUsersLotStateAction => {
  return { type: AuctionsTypes.CREATE_AUCTION_SUCCESS, newAuction };
};
const createCommercialOfferSuccess: ActionCreator<IUsersLotStateAction> = (
  newCommercialOffer: ILotsResult
): IUsersLotStateAction => {
  return { type: AuctionsTypes.CREATE_COMMERCIAL_OFFER_SUCCESS, newCommercialOffer };
};

export const createLot = (data: ICreateLot, typeOperation: TypeOperation, redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    dispatch(createLotRequest());
    try {
      if (typeOperation === 'auction') {
        const result = await postMyAuction(data);
        dispatch(createAuctionSuccess(result));
        redirect();
      } else if (typeOperation === 'commercial_offer') {
        const result = await postMyCommercialOffer(data);
        dispatch(createCommercialOfferSuccess(result));
        redirect();
      }
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const loadingAuctionsExpiredAtListRequest: ActionCreator<IUsersLotStateAction> = () => {
  return { type: AuctionsTypes.LOADING_LOT_EXPIRED_AT_LIST_REQUEST };
};
const loadingAuctionsExpiredAtListSuccess: ActionCreator<IUsersLotStateAdditionsAction> = (
  auctionExpiredAtList: IExpiredAtTime[]
): IUsersLotStateAdditionsAction => {
  return { type: AuctionsTypes.LOADING_LOT_EXPIRED_AT_LIST_SUCCESS, auctionExpiredAtList };
};

export const loadingAuctionsExpiredAtList = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingAuctionsExpiredAtListRequest());
    try {
      const auctionExpiredAtList = await getAuctionsExpiredAtList();
      dispatch(loadingAuctionsExpiredAtListSuccess(auctionExpiredAtList));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const submitBetRequest: ActionCreator<IUsersLotStateAction> = () => {
  return { type: AuctionsTypes.CREATE_NEW_OFFER_REQUEST };
};
const submitAuctionBetSuccess: ActionCreator<IUsersLotStateAdditionsAction> = (
  newAuctionOffer: ILotsResult
): IUsersLotStateAction => {
  return { type: AuctionsTypes.CREATE_NEW_AUCTION_OFFER_SUCCESS, newAuctionOffer };
};

const submitCommercialOfferBetSuccess: ActionCreator<IUsersLotStateAdditionsAction> = (
  newCommercialOffer: ILotsResult
): IUsersLotStateAction => {
  return { type: AuctionsTypes.CREATE_NEW_COMMERCIAL_OFFER_OFFER_SUCCESS, newCommercialOffer };
};

export const submitBet = (
  data: ICreateLot,
  id: string,
  typeOperation: TypeOperation,
  notification: NotificationType,
  redirect: () => void
) => {
  const { updatedBid, successfulBid } = notification;
  
  return async (dispatch: Dispatch) => {
    dispatch(submitBetRequest());
    try {
      const myOffers = await getAllMyOffers();
      const match = myOffers.results.find((i: IMyOffer) => i.lot.id === Number(id));

      if (match) {
        if (typeOperation === 'auction') {
          const result = await patchAuctionParticipate(data, id);
          dispatch(submitAuctionBetSuccess(result));
          dispatchNotification(dispatch, makeSuccessNotificationEntry(updatedBid));
        } else {
          const result = await postAuctionParticipate(data, id);
          dispatch(submitCommercialOfferBetSuccess(result));
          dispatchNotification(dispatch, makeSuccessNotificationEntry(updatedBid));
        }
      } else {
        if (typeOperation === 'auction') {
          const result = await postAuctionParticipate(data, id);
          dispatch(submitAuctionBetSuccess(result));
          dispatchNotification(dispatch, makeSuccessNotificationEntry(successfulBid));
        } else {
          const result = await postAuctionParticipate(data, id);
          dispatch(submitCommercialOfferBetSuccess(result));
          dispatchNotification(dispatch, makeSuccessNotificationEntry(successfulBid));
        }
        redirect();
      }
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const rejectInviteRequest: ActionCreator<IUsersLotStateAction> = () => {
  return { type: AuctionsTypes.REJECT_INVITE_REQUEST };
};
const rejectInviteSuccess: ActionCreator<IUsersLotStateAdditionsAction> = (
  rejectedInvite: IRejectedLot
): IUsersLotStateAction => {
  return { type: AuctionsTypes.REJECT_INVITE_SUCCESS, rejectedInvite };
};

export const rejectAuctionInvite = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(rejectInviteRequest());
    try {
      const result = await postRejectAuctionInvite(id);
      dispatch(rejectInviteSuccess(result));
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const cancelMyAuctionRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.LOADING_ARCHIVE_BY_ID_REQUEST };
};

const cancelMyAuctionSuccess: ActionCreator<IUsersLotStateByIdAction> = (
  archiveById: ILotsResult
): IUsersLotStateByIdAction => {
  return { type: AuctionsTypes.LOADING_ARCHIVE_BY_ID_SUCCESS, archiveById };
};

export const cancelMyAuction = (id: number, value: string, redirect: () => void, notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(cancelMyAuctionRequest());
    try {
      const data = await postCancelMyAuction(id, value);
      dispatch(cancelMyAuctionSuccess(data));
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
      redirect();
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

const acceptOfferRequest: ActionCreator<Action> = () => {
  return { type: AuctionsTypes.ACCEPT_OFFER_REQUEST };
};

const acceptOfferSuccess: ActionCreator<IUsersLotStateByIdAction> = (): IUsersLotStateByIdAction => {
  return { type: AuctionsTypes.ACCEPT_OFFER_SUCCESS };
};

export const acceptOffer = (data: IOffer, value: boolean, dispatchOpenModal: (id: number) => void) => {
  return async (dispatch: Dispatch) => {
    dispatch(acceptOfferRequest());
    try {
      patchAcceptOffer(data.id, value);
      dispatch(acceptOfferSuccess(1));
      dispatchOpenModal(data.company.id);
    } catch (e) {
      dispatchError(dispatch, e, loadingLotsError);
    }
  };
};

export const onChangeTabSuccess: ActionCreator<IUsersLotStateAdditionsAction> = (
  tab: TypeTab
): IUsersLotStateAdditionsAction => {
  return { type: AuctionsTypes.ON_CHANGE_TAB_SUCCESS, tab };
};

export const onChangeTab = (value: TypeTab) => {
  return (dispatch: Dispatch) => {
    dispatch(onChangeTabSuccess(value));
  };
};
