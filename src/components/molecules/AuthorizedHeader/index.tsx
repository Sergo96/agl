import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CurrenciesTabs from 'molecules/CurrenciesTabs';
import ProfileBar from 'molecules/ProfileBar';
import BaseFlex from 'atoms/Flex';
import Nav from 'molecules/Nav';
import ArrowDown from 'icons/ArrowDown';
import HamburgerButton from 'atoms/HamburgerButton';
import AdaptiveMenu from 'molecules/AdaptiveMenu';
import CompanyLogo from 'atoms/CompanyLogo';
import { headerInfo } from 'constants/headerInfo';
import { IHeaderBaseInfo } from 'interfaces/baseInfo';
import { IProps } from 'interfaces/props';
import { AlignItems, AlignSelf, JustifyContent } from 'interfaces/flex';
import Select from 'atoms/Select';
import classNames from 'classnames';
import BaseLink from 'atoms/Link';
import styles from './index.module.scss';


interface Props extends IProps {
  baseHeaderInfo?: IHeaderBaseInfo;
  logOut: () => void;
}

const AuthorizedHeader: React.FC<Props> = ({ baseHeaderInfo, logOut }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [t] = useTranslation('common');

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const burgerButtonClassNames = classNames(styles.burger, { [styles.burgerOpen]: menuOpen });

  const countrySelectOptions = [
    { value: 'russia', label: t<string>('header.countrySelect.russia') },
    { value: 'belarus', label: t<string>('header.countrySelect.belarus') },
  ];

  const changeCountry = (value: string | number) => {
    localStorage.setItem('country', value.toString());
  };

  const defaultCountry = localStorage.getItem('country')?.toString();

  return (
    <BaseFlex
      className={styles.root}
      alignItems={AlignItems.CENTER}
      alignSelf={AlignSelf.FLEX_START}
      justifyContent={JustifyContent.SPACE_BETWEEN}
    >
      <div className={styles.item}>
        <CurrenciesTabs currencies={baseHeaderInfo?.currencies} className={styles.currenciesTab} />
      </div>
      <BaseFlex alignItems={AlignItems.CENTER} className={styles.item}>
        <ProfileBar currencyOptions={headerInfo.currencyOptions} languageOptions={headerInfo.languageOptions} logOut={logOut} />
        <HamburgerButton className={burgerButtonClassNames} handleToggleMenu={handleToggleMenu} menuOpen={menuOpen} />
      </BaseFlex>
      <div className={styles.item}>
        <BaseFlex>
          <BaseLink href={'/home'}>
            <CompanyLogo />
          </BaseLink>
          <Select
            defaultValue={defaultCountry}
            suffixIcon={<ArrowDown width="8" height="6" />}
            className={styles.select}
            options={countrySelectOptions}
            onChange={changeCountry}
          />
        </BaseFlex>
      </div>
      <div className={styles.item}>
        <Nav navList={headerInfo.navList} className={styles.nav} />
      </div>
      {menuOpen && <AdaptiveMenu currencies={baseHeaderInfo?.currencies} />}
    </BaseFlex>
  );
};

export default AuthorizedHeader;
