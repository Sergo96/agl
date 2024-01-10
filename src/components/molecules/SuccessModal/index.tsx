import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { IProps } from 'interfaces/props';
import { JustifyContent, FlexDirection, AlignItems } from 'interfaces/flex';
import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import BaseFlex from 'atoms/Flex';
import CheckCircleIcon from 'icons/CheckCircleIcon';
import styles from './index.module.scss';


interface Props extends IProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  content?: ReactElement | string;
  title: string;
}

const SuccessModal: React.FC<Props> = ({ isModalVisible, handleOk, handleCancel, content, title }) => {
  const [t] = useTranslation('common');
  return (
    <Modal
      visible={isModalVisible}
      className={styles.madalWrp}
      onOk={handleOk}
      width={'100%'}
      closeIcon={<CloseOutlined onClick={handleCancel} />}
      footer={[
        <BaseButton
          className={styles.btn}
          type="primary"
          value={t<string>('Готово')}
          onClick={handleOk}
        />,
      ]}
    >
      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.body} alignItems={AlignItems.CENTER}>
        <BaseFlex justifyContent={JustifyContent.CENTER} className={styles.icon}>
          <CheckCircleIcon className={styles.acceptIcon} />
        </BaseFlex>
        <BaseTypography className={styles.title} lineHeight="28px" align="center" as="p" size="xl" weight="medium" color="secondary" value={title} />
        <BaseFlex className={styles.content}>{content}</BaseFlex>
      </BaseFlex>
    </Modal>
  );
};

export default SuccessModal;
