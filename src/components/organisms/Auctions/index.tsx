import { connect, ConnectedProps } from 'react-redux';
import { useEffect, useState, useMemo, ReactText } from 'react';
import { IAysAgroState } from 'store';
import { useTranslation } from 'react-i18next';
import { JustifyContent } from 'interfaces/flex';
import { IOption } from 'interfaces/options';
import { ILotsParams } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import { TypeTab } from 'interfaces/auth';
import { productsSelector } from 'selectors/products';
import { onChangeTab } from 'actions/auctions';
import { loadingProducts } from 'actions/products';
import {
  loadingLotsInProgress,
  loadingUserCommercialOffers,
  loadingCommercialOffersResponse,
  loadingLotsInvites,
  loadingLotsArchive,
  loadingUsersAuctions,  
  deleteLotsArchiveArray,
  rejectAuctionInvite,
} from 'actions/auctions';
import { saveLotsFilterParams } from 'actions/filtration';
import {
  userAuctionsSelector,
  auctionsInProgressSelector,
  userCOSelector,
  invitesLotsSelector,
  responceCOSelector,
  archiveLotsSelector,
} from 'selectors/auctions';
import { auctionsFilterParamsSelector } from 'selectors/filtration';
import { userRegInfoSelector } from 'selectors/auth';
import BaseTabs from 'organisms/BaseTabs';
import LotsFilterPanel from 'molecules/LotsFilterPanel';
import BaseFlex from 'atoms/Flex';
import LotsList from './LotsList';
import LotsArchive from './LotsArchive';
import styles from './index.module.scss';

const mapDispatchToProps = {
  loadingMyAuctions: (data: ILotsParams) => loadingUsersAuctions(data),
  loadingLotsInProgress: (data: ILotsParams) => loadingLotsInProgress(data),
  loadingMyCommercialOffers: (data: ILotsParams) => loadingUserCommercialOffers(data),
  loadingCommercialOffersResponse: (data: ILotsParams) => loadingCommercialOffersResponse(data),
  loadingLotsInvites: (data: ILotsParams) => loadingLotsInvites(data),
  loadingLotsArchive: () => loadingLotsArchive(),
  saveLotsFilterParams: (data: ILotsParams, type: TypeTab) => saveLotsFilterParams(data, type),
  loadingProducts: () => loadingProducts(),
  onChangeAuctionsTab: (type: TypeTab) => onChangeTab(type),
  deleteLotsArchiveArray: (data: ReactText[]) => deleteLotsArchiveArray(data),
  rejectAuctionInvite: (id: number) => rejectAuctionInvite(id)
};
const mapStateToProps = (state: IAysAgroState) => {
  return {
    usersAuctions: userAuctionsSelector(state),
    auctionsInProgress: auctionsInProgressSelector(state),
    userCommercialOffers: userCOSelector(state),
    userCommercialOffersResponse: responceCOSelector(state),
    invitesLots: invitesLotsSelector(state),
    archiveLots: archiveLotsSelector(state),
    globalFilterParams: auctionsFilterParamsSelector(state),
    products: productsSelector(state),
    userData: userRegInfoSelector(state),
    currentTab: state.auctions.tab,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {}

const Auctions: React.FC<Props> = ({
  usersAuctions,
  auctionsInProgress,
  userCommercialOffers,
  userCommercialOffersResponse,
  loadingMyAuctions,
  loadingLotsInProgress,
  loadingMyCommercialOffers,
  loadingCommercialOffersResponse,
  loadingLotsInvites,
  loadingLotsArchive,
  invitesLots,
  archiveLots,
  products,
  userData,
  saveLotsFilterParams,
  loadingProducts,
  currentTab,
  onChangeAuctionsTab,
  globalFilterParams,
  deleteLotsArchiveArray,
  rejectAuctionInvite,
}) => {
  const [t, i18n] = useTranslation('common');
  const panes = [
    {
      title: `${t('auctions.title.myAuctions')} (${usersAuctions.length})`,
      content: <LotsList data={usersAuctions} lotType="myAuctions" />,
      key: '1',
    },
    {
      title: `${t('auctions.title.auctionsInProgress')} (${auctionsInProgress.length})`,
      content: <LotsList data={auctionsInProgress} lotType="auctionsInProgress" />,
      key: '2',
    },
    {
      title: `${t('auctions.title.myCO')} (${userCommercialOffers.length})`,
      content: <LotsList data={userCommercialOffers} lotType="myCommercialOffers" />,
      key: '3',
    },
    {
      title: `${t('auctions.title.responseCO')} (${userCommercialOffersResponse.length})`,
      content: <LotsList data={userCommercialOffersResponse} lotType="myCommercialOffersResponse" />,
      key: '4',
    },
    {
      title: `${t('auctions.title.offers')} (${invitesLots.length})`,
      content: <LotsList data={invitesLots} lotType="invites" rejectAuctionInvite={rejectAuctionInvite} />,
      key: '5',
    },
    {
      title: `${t('auctions.title.archive')} (${archiveLots.length})`,
      content: <LotsArchive data={archiveLots} lotType="archive" deleteLotsArchiveArray={deleteLotsArchiveArray} />,
      key: '6',
    },
  ];
  const ALL_ITEMS = `${t('auctions.all')}`;

  const productsOptions: IOption[] = useMemo(() => {
    const result: IOption[] = [];
    result.push({ value: ALL_ITEMS, label: ALL_ITEMS });
    products.map((i) => {
      result.push({ value: i.id, label: i.name });
    });
    return result;
  }, [products, i18n.language]);

  const [activeTabKey, setActiveTabKey] = useState<string>('1');
  const [filterParams, setFilterParams] = useState<ILotsParams>({
    company: '',
    category: '',
    nomenclature: '',
    delivery_method: '',
    payment_method: '',
    is_purchase: null,
    quantity: { minValue: '', maxValue: '' },
    price: { minValue: '', maxValue: '' },
    typeSorting: '',
  });

  useEffect(() => {
    loadingLotsArchive();
  }, [archiveLots.length]);

  useEffect(() => {
    loadingProducts();
    loadingMyAuctions(filterParams);
    loadingLotsInProgress(filterParams);
    loadingMyCommercialOffers(filterParams);
    loadingCommercialOffersResponse(filterParams);
    loadingLotsInvites(filterParams);
  }, [i18n.language]);

  const onChangeProduct = (value: string | number) => {
    const category = value === ALL_ITEMS ? '' : value.toString();
    const params = { ...filterParams, category };
    setFilterParams(params);
    if (activeTabKey === '1') {
      loadingMyAuctions(params);
    } else if (activeTabKey === '2') {
      loadingLotsInProgress(params);
    } else if (activeTabKey === '3') {
      loadingMyCommercialOffers(params);
    } else if (activeTabKey === '4') {
      loadingCommercialOffersResponse(params);
    } else if (activeTabKey === '5') {
      loadingLotsInvites(params);
    }
    saveLotsFilterParams(params, currentTab - 1 as TypeTab);
  };

  const onChangeTradeType = (value: string | number) => {
    const param = () => {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else return null;
    };
    const isPurchase = param();
    const params = { ...filterParams, is_purchase: isPurchase };
    setFilterParams(params);
    if (activeTabKey === '1') {
      loadingMyAuctions(params);
    } else if (activeTabKey === '2') {
      loadingLotsInProgress(params);
    } else if (activeTabKey === '3') {
      loadingMyCommercialOffers(params);
    } else if (activeTabKey === '4') {
      loadingCommercialOffersResponse(params);
    } else if (activeTabKey === '5') {
      loadingLotsInvites(params);
    }
    saveLotsFilterParams(params, currentTab - 1 as TypeTab);
  };

  const onChangeCurrenTab = (activeKey: string) => {
    const type = Number(activeKey) as TypeTab;
    type && onChangeAuctionsTab(type);
    setActiveTabKey(activeKey);
  };

  const onSaveLotsFilterParams = (filterModalParams: ILotsParams) => {
    if (activeTabKey === '1') {
      loadingMyAuctions(filterModalParams);
    } else if (activeTabKey === '2') {
      loadingLotsInProgress(filterModalParams);
    } else if (activeTabKey === '3') {
      loadingMyCommercialOffers(filterModalParams);
    } else if (activeTabKey === '4') {
      loadingCommercialOffersResponse(filterModalParams);
    } else if (activeTabKey === '5') {
      loadingLotsInvites(filterModalParams);
    }
    saveLotsFilterParams(filterModalParams, currentTab - 1 as TypeTab);
  };

  return (
    <BaseFlex justifyContent={JustifyContent.START} className={styles.root}>
      <BaseTabs data={panes} className={styles.tab} activeKey={activeTabKey} onChange={onChangeCurrenTab}>
        {activeTabKey !== '6' && (
          <LotsFilterPanel
            filterProductParams={globalFilterParams && globalFilterParams[Number(activeTabKey) - 1].category}
            filterIsPurchase={globalFilterParams && globalFilterParams[Number(activeTabKey) - 1].is_purchase}
            productsOptions={productsOptions}
            onChangeProduct={onChangeProduct}
            onChangeTradeType={onChangeTradeType}
            userData={userData}
            products={products}
            saveLotsFilterParams={onSaveLotsFilterParams}
          />
        )}
      </BaseTabs>
    </BaseFlex>
  );
};

export default connector(Auctions);
