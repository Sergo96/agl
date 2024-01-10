import classNames from 'classnames';
import { IProps } from 'interfaces/props';
import { FlexDirection, AlignItems, JustifyContent } from 'interfaces/flex';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import Car from 'icons/Car';
import styles from './index.module.scss';

interface Props extends IProps {
  title: string;
  subtitle: string;
  price: number;
  deliveryValue: string;
}

const OfferItem: React.FC<Props> = ({ className, title, subtitle, price, deliveryValue }) => {
  return (
    <BaseFlex
      className={classNames(styles.itemWrp, className)}
      flexDirection={FlexDirection.COLUMN}
      alignItems={AlignItems.FLEX_START}
      justifyContent={JustifyContent.SPACE_BETWEEN}
    >
      <BaseFlex>
        <BaseFlex className={styles.header}>
          <BaseFlex className={styles.title}>{title}</BaseFlex>
          <BaseFlex className={styles.subtitle}>{subtitle}</BaseFlex>
        </BaseFlex>
        <BaseFlex className={styles.priceWrp}>
          <BaseTypography className={styles.price} value={`${price}$`} />
        </BaseFlex>
      </BaseFlex>
      <BaseFlex className={styles.deliveryWrp} flexDirection={FlexDirection.COLUMN}>
        <BaseFlex className={styles.icon}>
          <Car />
        </BaseFlex>
        <BaseFlex className={styles.delivery}>{deliveryValue}</BaseFlex>
      </BaseFlex>
    </BaseFlex>
  );
};

export default OfferItem;
