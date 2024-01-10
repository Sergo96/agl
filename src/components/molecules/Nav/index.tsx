import React from 'react';
import styles from './index.module.scss';
import BaseLink from 'atoms/Link';
import { IProps } from 'interfaces/props';
import { useTranslation } from 'react-i18next';
import { INavList } from 'interfaces/navList';

interface Props extends IProps {
  navList: INavList[];
}
const Nav: React.FC<Props> = ({ navList, ...props }) => {
  const [t] = useTranslation('common');

  return (
    <nav className={styles.root} {...props}>
      <ul className={styles.list}>
        {navList.map((item, i) => {
          return (
            <li key={i} className={styles.item}>
              <BaseLink className={styles.link} href={item.url}>
                {t<string>(item.i18nTitle)}
              </BaseLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Nav;
