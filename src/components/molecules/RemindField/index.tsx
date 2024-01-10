import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { JustifyContent, FlexDirection, AlignItems } from 'interfaces/flex';
import { IBaseAtomComponentProps } from 'interfaces/props';
import BaseCheckbox from 'atoms/Checkbox';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';

interface Props extends IBaseAtomComponentProps {
  className?: string;
}

const RemindField: React.FC<Props> = ({ className }) => {
  const [t] = useTranslation('common');
  const router = useRouter();

  const onForgotPass = useCallback(() => {
    router.push('/recover-password');
  }, []);

  const [checked, setChecked] = useState(true);
  const toggleCheckbox = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  return (
    <BaseFlex
      className={className}
      justifyContent={JustifyContent.SPACE_BETWEEN}
      flexDirection={FlexDirection.ROW}
      alignItems={AlignItems.CENTER}
    >
      <BaseCheckbox label={t<string>('auth.rememberMe')} checked={checked} onChange={toggleCheckbox} />
      <a onClick={onForgotPass} className={styles.btn}>
        {t('auth.forgotPassword')}?
      </a>
    </BaseFlex>
  );
};

export default RemindField;
