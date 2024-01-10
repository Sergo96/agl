import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import ArrowDown from 'icons/ArrowDown';
import { ICurrencies } from 'interfaces/baseInfo';
import { AlignItems } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import React from 'react';
import i18n from '../../../../i18n';
import styles from './index.module.scss';

interface Props extends IProps {
  currencies?: ICurrencies[];
}
const AdaptiveMenu: React.FC<Props> = ({ currencies }) => {
  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  const changeCurrency = (value: string) => {
    localStorage.setItem('currency', value);
  };

  return (
    <div className={styles.root}>
      <Menu mode="inline">
        <SubMenu key="1" title="Мой профиль">
          <Menu.Item key="2">Option 1</Menu.Item>
          <Menu.Item key="3">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="4">Каталог аукционов</Menu.Item>
        <Menu.Item key="5">Покупатели</Menu.Item>
        <Menu.Item key="6">Продавцы</Menu.Item>
        <Menu.Item key="7">Новости</Menu.Item>
        <Menu.Item key="8">Аналитика</Menu.Item>
        <SubMenu key="9" title="Курс валют">
          {currencies?.map((item) => {
            return (
              <Menu.Item key={item.name}>
                <BaseFlex alignItems={AlignItems.CENTER} className={styles.currency}>
                  <BaseTypography value={item.iso_code} />
                  <ArrowDown className={styles.arrow} color="#FF4D4F" />
                  <BaseTypography value={item.costs} />
                </BaseFlex>
              </Menu.Item>
            );
          })}
        </SubMenu>
        <SubMenu key="10" title="Выбрать язык">
          <Menu.Item key="11">
            <button className={styles.button} onClick={() => changeLanguage('ru')}>
              Русский
            </button>
          </Menu.Item>
          <Menu.Item key="12">
            <button className={styles.button} onClick={() => changeLanguage('en')}>
              English
            </button>
          </Menu.Item>
          <Menu.Item key="17">
            <button className={styles.button} onClick={() => changeLanguage('ua')}>
              Українська
            </button>
          </Menu.Item>
        </SubMenu>
        <SubMenu title="Выбрать валюту">
          <Menu.Item key="13">
            <button className={styles.button} onClick={() => changeCurrency('usd')}>
              USD
            </button>
          </Menu.Item>
          <Menu.Item key="14">
            <button className={styles.button} onClick={() => changeCurrency('eur')}>
              EUR
            </button>
          </Menu.Item>
          <Menu.Item key="15">
            <button className={styles.button} onClick={() => changeCurrency('byn')}>
              BYN
            </button>
          </Menu.Item>
          <Menu.Item key="16">
            <button className={styles.button} onClick={() => changeCurrency('uah')}>
              UAH
            </button>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default AdaptiveMenu;
