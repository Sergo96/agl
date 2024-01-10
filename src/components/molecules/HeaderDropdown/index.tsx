import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { IProps } from 'interfaces/props';
import BaseTypography from 'atoms/Typography';

interface Props extends IProps {
  logOut: () => void;
}

const HeaderDropdown: React.FC<Props> = ({ logOut }) => {
  const [t] = useTranslation('common');

  return (
    <Menu>
      <Menu.Item>
        <BaseTypography value={t<string>('header.personalArea')} />
      </Menu.Item>
      <Menu.Item>
        <BaseTypography value={t<string>('header.tariffPlans')} />
      </Menu.Item>
      <Menu.Item onClick={logOut}>
        <BaseTypography value={t<string>('header.logout')} />
      </Menu.Item>
    </Menu>
  );
};

export default HeaderDropdown;
