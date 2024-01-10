import { IBaseAtomComponentProps } from 'interfaces/props';
import styles from './index.module.scss';
import BaseFlex from 'atoms/Flex';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { useTranslation } from 'react-i18next';
interface Props extends IBaseAtomComponentProps {}

const BaseCopyrightNotice: React.FC<Props> = () => {
  const [t] = useTranslation('common');

  return (
    <div className={styles.copyrightNotice}>
      <BaseFlex flexDirection={FlexDirection.COLUMN} justifyContent={JustifyContent.CENTER}>
        {t<string>('footer.copyrightNotice')}
      </BaseFlex>
    </div>
  );
};
export default BaseCopyrightNotice;
