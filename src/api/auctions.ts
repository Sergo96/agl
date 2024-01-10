import axios from './axios';
import { ILotsParams, ICreateLot } from 'interfaces/auctions';
import { ReactText } from 'react';

const BASE_URL = `lot/`;
const SEARCH = `search/lots/`;
const AUTOCOMPLETE = SEARCH + 'suggest/';
const MY_AUCTIONS = BASE_URL + `my-auction/`;
const IN_PROGRESS = BASE_URL + 'my-auction-response/';
const COMMERCIAL_OFFERS = BASE_URL + 'my-commercial-offer/';
const COMMERCIAL_OFFERS_RESPONSE = BASE_URL + 'my-commercial-offer-response/';
const INVITES = BASE_URL + 'invites/';
const ARCHIVE = BASE_URL + 'archive/';
const INVITE_REJECT = BASE_URL + `participation-refuse/`;
const ACCEPT_OFFER = BASE_URL + `winner/`;
const OFFERS = BASE_URL + `offer/user/`;

export const getUsersAuctionsData = async (params: ILotsParams) => {
  const res = await axios({
    method: 'get',
    url: MY_AUCTIONS,
    params,
  });

  return res.data;
};

export const getAuctionDataById = async (id: number) => {
  const res = await axios({
    method: 'get',
    url: MY_AUCTIONS + id + '/',
  });
  return res.data;
};

export const getAuctionInProgressById = async (id: number) => {
  const res = await axios({
    method: 'get',
    url: IN_PROGRESS + id + '/',
  });
  return res.data;
};

export const getMyCommercialOfferById = async (id: number) => {
  const res = await axios({
    method: 'get',
    url: COMMERCIAL_OFFERS + id + '/',
  });
  return res.data;
};

export const getLotInvitesById = async (id: number) => {
  const res = await axios({
    method: 'get',
    url: INVITES + id + '/',
  });
  return res.data;
};

export const getLotArchiveById = async (id: number) => {
  const res = await axios({
    method: 'get',
    url: ARCHIVE + id + '/',
  });
  return res.data;
};

export const getSearchLotsAutocomplete = async (value: string) => {
  const res = await axios({
    method: 'get',
    url: AUTOCOMPLETE + `?search=${value}`,
  });
  return res.data;
};

export const getSearchLots = async (value: string) => {
  const res = await axios({
    method: 'get',
    url: SEARCH + `?search=${value}`,
  });
  return res.data;
};

export const getLotsInProgress = async (params: ILotsParams) => {
  const res = await axios({
    method: 'get',
    url: IN_PROGRESS,
    params,
  });
  return res.data;
};

export const getUserCommercialOffers = async (params: ILotsParams) => {
  const res = await axios({
    method: 'get',
    url: COMMERCIAL_OFFERS,
    params,
  });
  return res.data;
};

export const getCommercialOffersResponse = async (params: ILotsParams) => {
  const res = await axios({
    method: 'get',
    url: COMMERCIAL_OFFERS_RESPONSE,
    params,
  });
  return res.data;
};

export const getLotsInvites = async (params: ILotsParams) => {
  const res = await axios({
    method: 'get',
    url: INVITES,
    params,
  });
  return res.data;
};

export const getArchivedAuctions = async () => {
  const res = await axios({
    method: 'get',
    url: ARCHIVE,
  });
  return res.data;
};

export const deleteLotArchives = async (params: ReactText[]) => {
  const res = await axios({
    method: 'post',
    url: ARCHIVE + 'bulkdelete/',
    data: params,
  });
  return res.data;
};

export const postMyAuction = async (data: ICreateLot) => {
  const res = await axios({
    method: 'post',
    url: MY_AUCTIONS,
    data: data,
  });
  return res.data;
};

export const postMyCommercialOffer = async (data: ICreateLot) => {
  const res = await axios({
    method: 'post',
    url: COMMERCIAL_OFFERS,
    data: data,
  });
  return res.data;
};

export const getAuctionsExpiredAtList = async () => {
  const res = await axios({
    method: 'get',
    url: 'main/expired-at-list/',
  });
  return res.data;
};

export const postAuctionParticipate = async (data: ICreateLot, id: string) => {
  const res = await axios({
    method: 'post',
    url: `${INVITES}${id}/offer/`,
    data,
  });
  return res.data;
};

export const patchAuctionParticipate = async (data: ICreateLot, id: string) => {
  const res = await axios({
    method: 'patch',
    url: `${INVITES}${id}/offer/`,
    data,
  });
  return res.data;
};

export const postRejectAuctionInvite = async (id: number) => {
  const res = await axios({
    method: 'post',
    url: INVITE_REJECT,
    data: { lot: id },
  });
  return res.data;
};

export const postCancelMyAuction = async (id: number, value: string) => {
  const res = await axios({
    method: 'post',
    url: `${MY_AUCTIONS}${id}/close/`,
    data: { reason: value },
  });
  return res.data;
};

export const patchAcceptOffer = async (id: number, value: boolean) => {
  const res = await axios({
    method: 'patch',
    url: `${ACCEPT_OFFER}${id}/`,
    data: { winner: value },
  });
  return res.data;
};

export const getAllMyOffers = async () => {
  const res = await axios({
    method: 'get',
    url: OFFERS,
  });
  return res.data;
};
