import { connect, ConnectedProps } from 'react-redux';
import React, { useEffect, useState, ReactText, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { IAysAgroState } from 'store';
import classNames from 'classnames';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { RightOutlined, LeftOutlined, EditFilled } from '@ant-design/icons';
import { JustifyContent, FlexDirection, AlignItems } from 'interfaces/flex';
import { ILotsResult, LotEnum, IOffer, ICreateLot } from 'interfaces/auctions';
import Modal from 'antd/lib/modal/Modal';
import { IProps } from 'interfaces/props';
import { IBaseDTO, TypeOperation, NotificationType } from 'interfaces/general';
import {
  auctionByIdSelector,
  auctionInProgressByIdSelector,
  myCommerciallOfferByIdSelector,
  inviteByIdSelector,
  archiveByIdSelector,
} from 'selectors/auctions';
import { userRegInfoSelector } from 'selectors/auth';
import {
  loadingAuctionById,
  loadingAuctionInProgressById,
  loadinMyCommercialOfferById,
  loadingInviteById,
  loadingArchiveById,
  submitBet,
  cancelMyAuction,
  acceptOffer,
} from 'actions/auctions';
import PlaceBet from 'molecules/PlaceBet';
import BetInfo from 'molecules/BetInfo';
import BaseTable from 'molecules/Table';
import SuccessModal from 'molecules/SuccessModal';
import CompanyInfoCard from 'molecules/CompanyInfoCard';
import BaseFlex from 'atoms/Flex';
import BaseInputArea from 'atoms/InputArea';
import BaseLink from 'atoms/Link';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import LotCardItem from 'atoms/LotCardItem';
import styles from './index.module.scss';
import { loadingCompanyById } from 'actions/company';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    myAuctionDetails: auctionByIdSelector(state),
    auctionInProgressDetails: auctionInProgressByIdSelector(state),
    myCommercialOfferDetails: myCommerciallOfferByIdSelector(state),
    inviteDetails: inviteByIdSelector(state),
    archiveDetails: archiveByIdSelector(state),
    userData: userRegInfoSelector(state),
    usetIsAcceptOffer: state.auctions.userAcceptOffer,
    winningCompanyData: state.company.companyById
  };
};

const mapDispatchToProps = {
  loadingMyAuctionById: (id: number) => loadingAuctionById(id),
  loadingAuctionInProgressById: (id: number) => loadingAuctionInProgressById(id),
  loadingMyCOById: (id: number) => loadinMyCommercialOfferById(id),
  loadingInviteById: (id: number) => loadingInviteById(id),
  loadingArchiveById: (id: number) => loadingArchiveById(id),
  submitBet: (value: ICreateLot, id: string, typeOperation: TypeOperation, notification: NotificationType, redirect: () => void) =>
    submitBet(value, id, typeOperation, notification, redirect),
  cancelMyAuction: (id: number, value: string, redirect: () => void, notification: string) =>
    cancelMyAuction(id, value, redirect, notification),
  acceptOffer: (offerData: IOffer, value: boolean, dispatchOpenModal: (id:number) => void) => acceptOffer(offerData, value, dispatchOpenModal),
  loadingCompanyDataById: (id: number) => loadingCompanyById(id)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {}

const CurrentLot: React.FC<Props> = ({
  loadingMyAuctionById,
  myAuctionDetails,
  auctionInProgressDetails,
  loadingAuctionInProgressById,
  myCommercialOfferDetails,
  loadingMyCOById,
  loadingInviteById,
  inviteDetails,
  loadingArchiveById,
  archiveDetails,
  submitBet,
  cancelMyAuction,
  acceptOffer,
  userData,
  usetIsAcceptOffer,
  winningCompanyData,
  loadingCompanyDataById,
}) => {
  const [t, i18n] = useTranslation('common');
  const columns: ColumnsType<IOffer> = [
    {
      title: '№',
      dataIndex: 'id',
      render: (_i, _record, index) => {
        return <BaseFlex>{index + 1}</BaseFlex>;
      },
    },
    {
      title: `${t('auctions.table.companyName')}`,
      dataIndex: 'company',
      render: (i: IBaseDTO) => {
        return <BaseFlex>{i.name}</BaseFlex>;
      },
    },
    {
      title: `${t('auctions.table.rate')}`,
      dataIndex: 'price',
      render: (i, record) => {
        return <BaseTypography title={record.selected_currency_price} value={`$ ${i}`} />;
      },
    },
    {
      title: `${t('auctions.table.additionalConditions')}`,
      dataIndex: 'changed_conditions',
      render: (i, record) => {
        if (record.conditions_accepted) {
          return <BaseTypography title={record.selected_currency_price} value={`${i}`} />;
        } else {
          return (
            <BaseFlex flexDirection={FlexDirection.COLUMN}>
              {i.map((j: string) => (
                <BaseTypography title={record.selected_currency_price} value={`${j}`} />
              ))}
            </BaseFlex>
          );
        }
      },
    },
    {
      title: ``,
      dataIndex: 'button',
      render: (i, record) => {
        if (data?.company.id === userData?.company?.id) {
          return (
            <BaseButton
              value={data?.is_active ?  t<string>('auctions.accept') : 'Принято'}
              type="text"
              onClick={() => onAcceptOffer(record)}
              className={styles.tableBtn}
            />
          );
        } else if (record.company.id === userData?.company?.id) {
          return (
            <BaseLink href={{ pathname: `/edit-lot/${lotId}`, query: params }}>
              <EditFilled className={styles.icon} />
            </BaseLink>
          );
        } else {
          return null;
        }
      },
    },
  ];

  const router = useRouter();

  const [data, setData] = useState<ILotsResult>();

  const [currentId, setCurrentId] = useState<number>();

  const [typeLot, setTypeLot] = useState<LotEnum | undefined>();
  const [typeOperation, setTypeOperation] = useState<TypeOperation>('auction');
  const [offerAccept, setOfferAccept] = useState<boolean>(false);

  const lotId = router.query.id;

  const [currency, setCurrency] = useState<string | null>(null)

  useEffect(() => {
    setCurrency(localStorage.getItem('currency'))
  },[])

  useEffect(() => {
    setOfferAccept(usetIsAcceptOffer)
  }, [usetIsAcceptOffer]);

  useEffect(() => {
    setCurrentId(Number(lotId));
    setTypeLot(router.query.type_lot as LotEnum);
    setTypeOperation(router.query.typeOperation as TypeOperation);
  }, [lotId, router.query.type_lot]);

  useEffect(() => {
    if (currentId) {
      if (typeLot === LotEnum.myAuctions) {
        loadingMyAuctionById(currentId);
      } else if (typeLot === LotEnum.auctionsInProgress) {
        loadingAuctionInProgressById(currentId);
      } else if (typeLot === LotEnum.myCommercialOffers) {
        loadingMyCOById(currentId);
      } else if (typeLot === LotEnum.invites) {
        loadingInviteById(currentId);
      } else if (typeLot === LotEnum.archive) {
        loadingArchiveById(currentId);
      }
    }
  }, [typeLot, currentId]);

  useEffect(() => {
    if (typeLot === LotEnum.myAuctions) {
      myAuctionDetails && setData(myAuctionDetails);
    } else if (typeLot === LotEnum.auctionsInProgress) {
      auctionInProgressDetails && setData(auctionInProgressDetails);
    } else if (typeLot === LotEnum.myCommercialOffers) {
      myCommercialOfferDetails && setData(myCommercialOfferDetails);
    } else if (typeLot === LotEnum.invites) {
      inviteDetails && setData(inviteDetails);
    } else if (typeLot === LotEnum.archive) {
      archiveDetails && setData(archiveDetails);
    }
  }, [myAuctionDetails, auctionInProgressDetails, myCommercialOfferDetails, inviteDetails, archiveDetails, i18n.language]);

  const dateDeliveryTo = data?.delivery_to ? moment.unix(Number(data?.delivery_to)).format('DD.MM.YYYY') : '';
  const dateDeliveryFrom = data?.delivery_from ? moment.unix(Number(data?.delivery_from)).format('DD.MM.YYYY') : '';
  const dateExpiredAt = data?.expired_at ? moment.unix(Number(data?.expired_at)).format('HH:MM | DD.MM.YYYY ') : '';
  const dateGrecePeriod = data?.grace_period_to ? moment.unix(Number(data?.grace_period_to)).format('DD.MM.YYYY ') : '';

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPriceValue, setNewPriceValue] = useState<number | undefined>(undefined);
  const [recommendedRate, setRecommendedRate] = useState<number>(0);

  const [closeAuctionReason, setCloseAuctionReason] = useState<string>('');
  const params = {
    payment_method: data?.payment_method ? data.payment_method.id : 1,
    delivery_method: data?.delivery_method ? data?.delivery_method.id : 1,
    prepayment_percent: data?.prepayment_percent ? data?.prepayment_percent : null,
    quantity: data?.quantity ? data?.quantity : null,
    units: data?.units ? data.units.id : 1,
    delivery_from: Number(data?.delivery_from),
    delivery_to: Number(data?.delivery_to),
    expired_at: Number(data?.expired_at),
    grace_period_to: Number(data?.grace_period_to),
    price: newPriceValue ? newPriceValue : 0,
  };

  useEffect(() => {
    if (data) {
      data?.current_offer?.price ? setRecommendedRate(data?.current_offer?.price) : setRecommendedRate(data.price);
    }
  }, [data?.current_offer?.price]);

  const redirect = () => {
    router.push('/auctions');
  };

  const onAcceptOffer = (record: IOffer) => {
    acceptOffer(record, true, dispatchOpenModalSuccesOffer);
  };

  const dispatchOpenModalSuccesOffer = (id: number) => {
    loadingCompanyDataById(id)
  }

  const onChangeNewPriceValue = (value: ReactText) => {
    setNewPriceValue(value as number);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const id = data?.id;
    closeAuctionReason && id ? cancelMyAuction(id, closeAuctionReason, redirect, t('notifications.auctionCanceled')) : null;
    setIsModalVisible(false);
    setCloseAuctionReason('');
  };

  const handleOkSuccesOfferModal = () => {
    setOfferAccept(false)
 }

  const handleCancel = () => {
    setIsModalVisible(false);
    setCloseAuctionReason('');
  };

  const onSubmitBet = () => {
   const  notification: NotificationType = {
     updatedBid: t('notifications.updatedBid'),
     successfulBid: t('notifications.successfulBid'),
    }
    router.query.id && data ? submitBet(params, router.query.id as string, typeOperation, notification, redirect) : null;
    setNewPriceValue(undefined)
  };

  const cancelAuction = () => {
    showModal();
  };

  const onChangeAuctionReason = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCloseAuctionReason(e.target.value);
  };

  const redirectToEditPage = () => {
    router.push({
      pathname: `/edit-lot/${lotId}`,
      query: {
        typeOperation: 'auction',
        id: lotId,
        price: data?.current_offer?.price,
        payment_method: data?.payment_method.id,
        prepayment_percent: data?.prepayment_percent,
        grace_period_to: data?.grace_period_to,
        quantity: data?.quantity,
        units: data?.units ? data?.units.id : null,
        delivery_from: data?.delivery_from,
        delivery_to: data?.delivery_to,
        address: data?.address,
        delivery_method: data?.delivery_method.id,
        nomenclature: data?.nomenclature.id,
        expired_at: data?.expired_at,
      },
    });
  };
  return (
    <BaseFlex justifyContent={JustifyContent.CENTER}>
      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.root}>
        <BaseFlex className={styles.back} alignItems={AlignItems.CENTER}>
          <LeftOutlined className={styles.arrowBtnIcon} />
          <BaseButton
            className={styles.arrowBtn}
            type="link"
            value={t<string>('auctions.back')}
            onClick={router.back}
          />
        </BaseFlex>
        <BaseFlex className={styles.header} flexDirection={FlexDirection.COLUMN}>
          <BaseTypography lineHeight="20px" as="h1" size="xl" weight="medium" value={data?.nomenclature.name} />
          <BaseTypography as="span" size="xs" weight="regular" value={data?.company.name} />
        </BaseFlex>

        <BaseFlex
          className={styles.wrpContent}
          justifyContent={JustifyContent.START}
          alignItems={AlignItems.FLEX_START}
        >
          {data && (
            <BaseFlex className={classNames(styles.column, styles.data)}>
              {typeOperation !== 'commercial_offer' ? (
                <LotCardItem
                  title={`${t<string>('auctions.lot')} `}
                  value={data?.id}
                  className={classNames(styles.item)}
                  classNameTitle={classNames(styles.title)}
                />
              ) : (
                ''
              )}
              {typeOperation !== 'commercial_offer' ? (
                <LotCardItem
                  title={`${t('auctions.startingPrice')}:`}
                  value={data?.price}
                  className={classNames(styles.item)}
                  classNameTitle={classNames(styles.title)}
                />
              ) : (
                ''
              )}

              {data?.is_purchase && (
                <LotCardItem
                  title={`${t<string>('auctions.type')} `}
                  value={
                    data?.is_purchase ? `${t<string>('auctions.typeLotBuy')}` : `${t<string>('auctions.typeLotSell')}`
                  }
                  className={classNames(styles.item)}
                  classNameTitle={classNames(styles.title)}
                />
              )}

              <LotCardItem
                title={`${t('auctions.paymentType')}`}
                value={
                  data?.payment_method.id === 1
                    ? `${data?.payment_method.name} ${data.prepayment_percent} %`
                    : `${data?.payment_method.name} ${t('auctions.to')} ${dateGrecePeriod}`
                }
                className={classNames(styles.item)}
                classNameTitle={classNames(styles.title)}
              />

              <LotCardItem
                title={`${t('auctions.quantity')}`}
                value={data?.units ? `${data?.quantity} ${data?.units.name}` : ''}
                className={classNames(styles.item)}
                classNameTitle={classNames(styles.title)}
              />

              <LotCardItem
                title={`${t('auctions.deliveryPeriod')}`}
                value={`${t('auctions.from')} ${dateDeliveryFrom} ${t('auctions.to')} ${dateDeliveryTo}`}
                className={classNames(styles.item)}
                classNameTitle={classNames(styles.title)}
              />

              {data?.time_to_expire && (
                <LotCardItem
                  title={`${t('auctions.expiredAt')}:`}
                  value={dateExpiredAt}
                  className={classNames(styles.item)}
                  classNameTitle={classNames(styles.title)}
                />
              )}

              <LotCardItem
                title={`${t('auctions.deliveryMethod')}`}
                value={data?.delivery_method.name}
                className={classNames(styles.item)}
                classNameTitle={classNames(styles.title)}
              />
            </BaseFlex>
          )}
          {typeOperation === 'auction' && (
            <BaseFlex className={classNames(styles.columnLeft, styles.timeWrp)} flexDirection={FlexDirection.COLUMN}>
              <BaseFlex className={styles.time}>
                <BaseTypography
                  className={styles.timeToExpire}
                  weight="extra-bold"
                  size="sm"
                  value={`${data?.time_to_expire?.days} ${t('time.days')}  ${data?.time_to_expire?.hours} ${t(
                    'time.hours'
                  )} ${data?.time_to_expire?.minutes} ${t('time.minutes')}`}
                />
                <BaseFlex className={styles.timeLeft} alignItems={AlignItems.CENTER}>
                  <BaseFlex className={styles.line}></BaseFlex>
                  <BaseTypography  size="xs" value={t<string>('auctions.timeLeft')} />
                </BaseFlex>
              </BaseFlex>
              {data?.offers.length ? <BetInfo currency={currency} data={data} /> : ''}
              <BaseLink href="/company-list" className={styles.companyLink}>
                <RightOutlined className={styles.icon} />
                {t('auctions.comapyniesPaticipating')} ({data && data.offers.length})
              </BaseLink>
              {data?.company.id === userData?.company?.id ? (
                <>
                  <BaseButton
                    value={t<string>('auctions.cancelAuction')}
                    type="default"
                    onClick={cancelAuction}
                    className={styles.rejectBtn}
                  />
                  <BaseTypography
                    className={styles.rejectSubtitle}
                    size="xs"
                    color="secondary"
                    value={t<string>('auctions.cancelReasonLabel')}
                  />
                </>
              ) : (
                ''
              )}
              {data?.company.id !== userData?.company?.id ? (
                <PlaceBet
                  redirectToEditPage={redirectToEditPage}
                  onSubmitBet={onSubmitBet}
                  value={newPriceValue && newPriceValue}
                  onChangeValue={onChangeNewPriceValue}
                  recommendedRate={recommendedRate}
                />
              ) : (
                ''
              )}
            </BaseFlex>
          )}
        </BaseFlex>
        {data && data?.offers.length ? (
          <BaseFlex className={styles.wrpOffers} justifyContent={JustifyContent.SPACE_BETWEEN}>
            <BaseFlex className={styles.header} flexDirection={FlexDirection.COLUMN}>
              <BaseTypography
                as="h1"
                size="lg"
                weight="medium"
                value={`${t<string>('auctions.offers')}  (${data?.offers.length} ${t('auctions.outOf')} ${
                  data?.offers_num
                })`}
              />
            </BaseFlex>
            <BaseTable columns={columns} data={data ? data.offers : []} />
          </BaseFlex>
        ) : (
          ''
        )}
      </BaseFlex>

      <Modal
        title={t<string>('auctions.cancelReasonModalTitle')}
        visible={isModalVisible}
        className={styles.madalWrp}
        onOk={handleOk}
        bodyStyle={{ height: 280 }}
        width={'100%'}
        footer={[
          <BaseButton
            className={styles.defaultBtn}
            value={t<string>('registration.step4.close')}
            onClick={handleCancel}
          />,
          <BaseButton
            className={styles.saveBtn}
            type="primary"
            value={t<string>('registration.step4.save')}
            onClick={handleOk}
          />,
        ]}
      >
        <BaseTypography size="xs" color="secondary" value={t<string>('auctions.cancelReasonModalLabel')} />
        <BaseInputArea className={styles.formInputAreaField} onChange={onChangeAuctionReason} />
      </Modal>
      <SuccessModal
        isModalVisible={offerAccept}
        handleOk={handleOkSuccesOfferModal}
        handleCancel={handleOkSuccesOfferModal}
        title={t<string>('auctions.acceptOffer.title')}
        content={ winningCompanyData ? <CompanyInfoCard data={winningCompanyData} /> : "Данный нет"}
      />
    </BaseFlex>
  );
};

export default connector(CurrentLot);
