import React from 'react';
import { Dropdown } from 'antd';
import HeaderDropdown from 'molecules/HeaderDropdown';
import { AlignItems } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import { IOption } from 'interfaces/options';
import BaseFlex from 'atoms/Flex';
import Bell from 'icons/Bell';
import ArrowDown from 'icons/ArrowDown';
import MyProfile from 'icons/MyProfile';
import BaseSelect from 'atoms/Select';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

interface Props extends IProps {
  currencyOptions: IOption[];
  languageOptions: IOption[];
  logOut: () => void;
}

const ProfileBar: React.FC<Props> = ({ currencyOptions, languageOptions, logOut }) => {
  const { i18n } = useTranslation('common');

  const changeLanguage = (value: string | number) => {
    i18n.changeLanguage(value.toString());
  };

  const changeCurrency = (value: string | number) => {
    localStorage.setItem('currency', value.toString());
  };

  const defaultCurrency = localStorage.getItem('currency')?.toString();

  return (
    <BaseFlex className={styles.root} alignItems={AlignItems.CENTER}>
      <div>
        <BaseSelect
          onChange={changeCurrency}
          bordered={false}
          defaultValue={defaultCurrency}
          suffixIcon={<ArrowDown color="#1890FF" width="8" height="6" />}
          className={styles.select}
          options={currencyOptions}
        />
      </div>
      <div>
        <BaseSelect
          onChange={changeLanguage}
          bordered={false}
          defaultValue={i18n.language}
          suffixIcon={<ArrowDown color="#1890FF" width="8" height="6" />}
          className={styles.select}
          options={languageOptions}
        />
      </div>
      <BaseFlex className={styles.icons}>
        <Bell />
      </BaseFlex>
      <BaseFlex className={styles.icons}>
        <Dropdown overlay={<HeaderDropdown logOut={logOut}/>} placement="bottomRight">
          <MyProfile />
        </Dropdown>
      </BaseFlex>
    </BaseFlex>
  );
};

export default ProfileBar;
