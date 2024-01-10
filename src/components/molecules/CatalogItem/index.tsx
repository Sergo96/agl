import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { IGetNomenclature } from 'interfaces/nomenclature';
import BaseTypography from 'atoms/Typography';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

interface Props extends IProps {
  title: string;
  nomenclature: IGetNomenclature;
  category: number;
}

const CatalogProductItem: React.FC<Props> = ({ className, title, category, nomenclature }) => {
  const [t] = useTranslation('common');

  const [countLots, setCountLots] = useState<string>(``);
  useEffect(() => {
    const countLots = nomenclature.results.filter((i) => i?.category?.id === category).length;
    const expression =
      countLots === 0 || countLots > 4
        ? `${(
            <BaseTypography value={`${t<string>('homePage.available')} ${countLots} ${t<string>('homePage.lot')}`} />
          )}`
        : `${(
            <BaseTypography value={`${t<string>('homePage.available')} ${countLots} ${t<string>('homePage.lot')}`} />
          )}`;
    setCountLots(expression);
  }, [nomenclature]);

  return (
    <BaseFlex
      className={classNames(styles.itemWrp, className)}
      flexDirection={FlexDirection.COLUMN}
      justifyContent={JustifyContent.SPACE_BETWEEN}
    >
      <BaseTypography value={title} size={'sm'} weight={'medium'} className={styles.title} uppercase />
      <BaseTypography value={countLots} size={'xs'} weight={'regular'} className={styles.subtitle} />
    </BaseFlex>
  );
};

export default CatalogProductItem;
