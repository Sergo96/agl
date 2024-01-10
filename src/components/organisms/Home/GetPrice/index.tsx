import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect, useState } from 'react';
import { IAysAgroState } from 'store';
import { FlexDirection, JustifyContent, AlignItems } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import { IOption } from 'interfaces/options';
import { nomenclatureSelector } from 'selectors/nomenclature';
import Ellipse from 'icons/Ellipse';
import BaseTabs from 'organisms/BaseTabs';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import BaseLink from 'atoms/Link';
import BaseSelect from 'atoms/Select';
import { countryListSelector } from 'selectors/general';
import { loadingCountryList } from 'actions/general';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    countries: countryListSelector(state),
    nomenclature: nomenclatureSelector(state),
  };
};

const mapDispatchToProps = {
  loadCountries: () => loadingCountryList(true),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {
  title: string;
  subtitle: string;
}

const GetPrice: React.FC<Props> = ({ nomenclature, countries, loadCountries, title, subtitle }) => {
  const [t] = useTranslation('common');
  const { i18n } = useTranslation('common');
  const router = useRouter();

  useEffect(() => {
    loadCountries();
  }, [i18n.language]);

  const [productForBuy, setProductForBuy] = useState<string>('');
  const [productForSell, setProductForSell] = useState<string>('');

  const [countryForBuy, setCountryForBuy] = useState<string>('');
  const [countriesForSell, setCountriesForSell] = useState<string>('');

  const onChangeProductForBuy = (value: string | number) => {
    setProductForBuy(value.toString());
  };

  const onChangeProductForSell = (value: string | number) => {
    setProductForSell(value.toString());
  };

  const onChangeCountriesForBuy = (value: string | number) => {
    setCountryForBuy(value.toString());
  };

  const onChangeCountriesForSell = (value: string | number) => {
    setCountriesForSell(value.toString());
  };
  const onDirectToRegistration = () => {
    router.push('/registration');
  };

  const showBestPrices = () => {
    router.push('/registration');
  };
  const productsOptions: IOption[] = nomenclature.results.map((i) => {
    return {
      value: i.name,
      label: i.name,
    };
  });

  const countriesOptions: IOption[] =
    countries &&
    countries.map((i) => {
      return {
        value: i.name,
        label: i.name,
      };
    });

  const Tab1 = () => {
    return (
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} flexDirection={FlexDirection.COLUMN}>
        <BaseFlex className={styles.selectsWrp} flexDirection={FlexDirection.COLUMN}>
          <BaseSelect
            value={productForBuy}
            className={styles.selectItem}
            size="large"
            options={productsOptions}
            onChange={onChangeProductForBuy}
            placeholder={t('homePage.selectProductName')}
          />
          <BaseSelect
            value={countryForBuy}
            className={styles.selectItem}
            size="large"
            options={countriesOptions}
            placeholder={t('homePage.selectRegion')}
            onChange={onChangeCountriesForBuy}
          />
        </BaseFlex>
        <BaseButton onClick={showBestPrices} value={t<string>('homePage.showBestPrice')} size="large" type="primary" />
      </BaseFlex>
    );
  };

  const Tab2 = () => {
    return (
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} flexDirection={FlexDirection.COLUMN}>
        <BaseFlex className={styles.selectsWrp} flexDirection={FlexDirection.COLUMN}>
          <BaseSelect
            value={productForSell}
            className={styles.selectItem}
            placeholder={t('homePage.selectProductName')}
            onChange={onChangeProductForSell}
            options={productsOptions}
          />
          <BaseSelect
            value={countriesForSell}
            className={styles.selectItem}
            placeholder={t('homePage.selectRegion')}
            onChange={onChangeCountriesForSell}
            options={countriesOptions}
          />
        </BaseFlex>
        <BaseButton
          className={styles.selectsBtn}
          value={t<string>('homePage.showBestPrice')}
          size="large"
          type="primary"
        />
      </BaseFlex>
    );
  };
  const panes = [
    { title: `${t('homePage.buy')}`, content: <Tab1 />, key: '1' },
    { title: `${t('homePage.sell')}`, content: <Tab2 />, key: '2' },
  ];
  const htmlPart = title;
  return (
    <BaseFlex
      className={styles.mainWrp}
      justifyContent={JustifyContent.SPACE_AROUND}
      alignItems={AlignItems.FLEX_START}
    >
      <BaseFlex className={styles.columnWrp} alignItems={AlignItems.CENTER} justifyContent={JustifyContent.CENTER}>
        <BaseFlex flexDirection={FlexDirection.COLUMN} justifyContent={JustifyContent.CENTER}>
          <BaseFlex
            as="header"
            className={styles.description}
            flexDirection={FlexDirection.COLUMN}
            alignItems={AlignItems.FLEX_START}
          >
            <BaseFlex as="h1" className={styles.title}>
              <div dangerouslySetInnerHTML={{ __html: htmlPart }} />
            </BaseFlex>
            <BaseTypography as="p" className={styles.subtitle} value={subtitle} />
          </BaseFlex>
          <BaseButton
            onClick={onDirectToRegistration}
            className={styles.btn}
            value={`${t('header.registration')}`}
            size="large"
            type="primary"
          />
          <BaseFlex className={styles.linkItem} flexDirection={FlexDirection.ROW} alignItems={AlignItems.CENTER}>
            <Ellipse />
            <BaseLink className={styles.linkItemTitle} href="#participationConditions">
              {t('homePage.typesOfAuctions')}
            </BaseLink>
          </BaseFlex>
        </BaseFlex>
      </BaseFlex>
      <BaseFlex className={styles.columnWrp} alignItems={AlignItems.CENTER} justifyContent={JustifyContent.CENTER}>
        <BaseFlex className={styles.formLoyout} flexDirection={FlexDirection.COLUMN}>
          <BaseTypography className={styles.formLoyoutTitle} value={t<string>('homePage.findOutBestPrice')} />
          <BaseTabs data={panes} className={styles.tab} />
        </BaseFlex>
      </BaseFlex>
    </BaseFlex>
  );
};

export default connector(GetPrice);
