import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { TypeOperation } from 'interfaces/general';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import CheckIcon from 'icons/CheckIcon';
import styles from './index.module.scss';
import stepStyles from '../index.module.scss';

interface Props extends IProps {
  selectTypeLot: (value: TypeOperation) => void;
  typeOperation: TypeOperation;
  next: () => void;
}

const CreateLotStep1: React.FC<Props> = ({ selectTypeLot, typeOperation, next }) => {
  const [t] = useTranslation('common');
  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN}>
      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.titleWrp}>
        <BaseTypography
          className={styles.title}
          size="sm"
          color="primary"
          weight="medium"
          value={t<string>('auctions.create.step1.title')}
        />
      </BaseFlex>
      <BaseTypography
        weight="bold"
        size="xl"
        className={styles.header}
        value={t<string>('auctions.create.step1.header')}
      />
      <BaseFlex className={styles.wrp}>
        <div className={classNames(styles.item, typeOperation === 'auction' && styles.selectedType)}>
          <BaseTypography
            as="p"
            className={styles.title}
            size="lg"
            weight="bold"
            value={t<string>('auctions.create.step1.createAuction')}
          />
          <BaseTypography
            className={styles.description}
            size="md"
            weight="regular"
            value={t<string>('auctions.create.step1.createAuctionDescription')}
          />
          <BaseButton
            value={
              typeOperation === 'auction' ? t<string>('auctions.create.select') : t<string>('auctions.create.selected')
            }
            icon={typeOperation === 'auction' ? <CheckIcon /> : null}
            type={typeOperation !== 'auction' ? 'primary' : undefined}
            className={classNames(styles.btn, typeOperation === 'auction' && styles.selectedTypeBtn)}
            onClick={() => selectTypeLot('auction')}
          />
        </div>
        <div className={classNames(styles.item, typeOperation === 'commercial_offer' && styles.selectedType)}>
          <BaseTypography
            as="p"
            className={styles.title}
            size="lg"
            weight="bold"
            value={t<string>('auctions.create.step1.requestCO')}
          />
          <BaseTypography
            className={styles.description}
            weight="regular"
            size="md"
            value={t<string>('auctions.create.step1.requestCODescription')}
          />
          <BaseButton
            value={typeOperation === 'commercial_offer' ? t<string>('auctions.create.selected') : t<string>('auctions.create.select')}
            type={typeOperation !== 'commercial_offer' ? 'primary' : undefined}
            icon={typeOperation === 'commercial_offer' ? <CheckIcon /> : null}
            className={classNames(styles.btn, typeOperation === 'commercial_offer' && styles.selectedTypeBtn)}
            onClick={() => selectTypeLot('commercial_offer')}
          />
        </div>
      </BaseFlex>

      <BaseFlex
        justifyContent={JustifyContent.SPACE_BETWEEN}
        flexDirection={FlexDirection.ROW}
        className={stepStyles.stepsAction}
      >
        <BaseButton
          className={stepStyles.btnNext}
          type="primary"
          onClick={next}
          value={t<string>('registration.navigation.nextStep')}
        />
      </BaseFlex>
    </BaseFlex>
  );
};

export default CreateLotStep1;
