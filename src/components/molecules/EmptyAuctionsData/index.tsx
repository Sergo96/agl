import { FlexDirection, JustifyContent, AlignItems, FlexWrap } from 'interfaces/flex';
import { useTranslation } from 'react-i18next';
import { IProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import styles from './index.module.scss';

interface Props extends IProps {
  isBtn?: boolean;
  value: string;
}

const EmptyAuctionsData: React.FC<Props> = ({ isBtn, value }) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex justifyContent={JustifyContent.CENTER} className={styles.root}>
      <BaseFlex
        className={styles.invertedSquareWrp}
        flexDirection={FlexDirection.COLUMN}
        alignItems={AlignItems.CENTER}
        justifyContent={JustifyContent.CENTER}
      >
        <BaseFlex className={styles.invertedSquare}></BaseFlex>
        <BaseFlex>
          <img className={styles.img} src="assets/images/EmptyAuctionsLogo.png" alt="Company logo" />
        </BaseFlex>
        <BaseTypography className={styles.typography} value={value} />
        {isBtn && (
          <BaseFlex className={styles.btnWrp} flexWrap={FlexWrap.NOWRAP}>
            <BaseButton value={t<string>('auctions.buy')} type="primary" className={styles.btn} />
            <BaseButton value={t<string>('auctions.sell')} type="primary" className={styles.btn} />
          </BaseFlex>
        )}
      </BaseFlex>
    </BaseFlex>
  );
};

export default EmptyAuctionsData;
