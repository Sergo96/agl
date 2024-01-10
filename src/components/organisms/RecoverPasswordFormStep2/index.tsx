import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Message from 'icons/Message';
import BaseTypography from 'atoms/Typography';
import BaseFlex from 'atoms/Flex';
import { AlignItems, JustifyContent, FlexDirection } from 'interfaces/flex';
import { IBaseAtomComponentProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IBaseAtomComponentProps {}
const RecoverPasswordFormStep2: React.FC<Props> = () => {
  const [t] = useTranslation('common');
  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} justifyContent={JustifyContent.CENTER} className={styles.layoutWrp}>
      <BaseFlex alignItems={AlignItems.CENTER} justifyContent={JustifyContent.CENTER}>
        <div className={styles.iconWrp}>
          <BaseFlex alignItems={AlignItems.CENTER} justifyContent={JustifyContent.CENTER} fullHeight={true}>
            <Message />
          </BaseFlex>
        </div>
      </BaseFlex>
      <div className={classNames(styles.formField, styles.textField)}>
        <BaseTypography value={t<string>('auth.passwordRecoveryStep2')} />
      </div>
    </BaseFlex>
  );
};

export default RecoverPasswordFormStep2;
