import React from 'react';
import BaseTypography from 'atoms/Typography';
import BaseFlex from 'atoms/Flex';
import { AlignItems, FlexDirection, JustifyContent } from 'interfaces/flex';
import styles from './index.module.scss';
import classNames from 'classnames';
import { connect, ConnectedProps } from 'react-redux';
import { IAysAgroState } from 'store';
import { avatarSelector } from 'selectors/profile';
import { loadingAvatarInfo, updateAvatar } from 'actions/profile';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { message, Upload } from 'antd';
import CompanyLogo from 'atoms/CompanyLogo';
import BaseButton from 'atoms/Button';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { IProps } from 'interfaces/props';
import { useTranslation } from 'react-i18next';
import { IPostAvatar } from 'interfaces/profile';

const mapStateToProps = (state: IAysAgroState) => ({
  avatar: avatarSelector(state),
});

const mapDispatchToProps = {
  loadAvatar: () => loadingAvatarInfo(),
  updateAvatar: (data: FormData, notification: string) => updateAvatar(data, notification),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux, IProps {}

const defaultValues: IPostAvatar = {
  avatarFile: undefined,
};
const ProfileImageCard: React.FC<Props> = ({ className, loadAvatar, avatar, updateAvatar }) => {
  const [t] = useTranslation('common');

  useEffect(() => {
    loadAvatar();
  }, []);

  const { control, watch } = useForm<IPostAvatar>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const avatar = watch('avatarFile');
    if (avatar && avatar.fileList[0] && avatar.fileList[0].status === 'done') {
      const fileSizeLimit = 2;
      const isLt2M = avatar && avatar.fileList[0] && avatar.fileList[0].size / 1024 / 1024 < fileSizeLimit;
      if (!isLt2M) {
        message.error(t('profile.imageCard.validationMessage'));
      } else {
        onSubmit(avatar);
      }
    }
  }, [watch('avatarFile')]);

  const avatarImg = (
    <>
      {avatar.avatar ? (
        <img className={styles.logo} src={avatar.avatar} alt={t('profile.imageCard.alt')} />
      ) : (
        <CompanyLogo className={styles.logo} theme="transparent" />
      )}
    </>
  );

  const onSubmit = (data: UploadChangeParam) => {
    if (data) {
      const formData = new FormData();
      if (data?.fileList[0]?.originFileObj) {
        formData.append('avatar', data?.fileList[0]?.originFileObj);
        updateAvatar(formData, t<string>('notifications.avatarUpdateSucess'));
      }
    }
  };

  return (
    <form className={classNames(styles.imageCard, className)}>
      <BaseFlex alignItems={AlignItems.CENTER} className={styles.logoBox}>
        {avatarImg}
      </BaseFlex>

      <BaseFlex
        className={styles.description}
        justifyContent={JustifyContent.SPACE_BETWEEN}
        flexDirection={FlexDirection.COLUMN}
        alignItems={AlignItems.FLEX_START}
      >
        <BaseTypography className={styles.title} weight="bold" value={t<string>('profile.imageCard.companyLogo')} />
        <BaseTypography className={styles.format} value={t<string>('profile.imageCard.format')} />
        <Controller
          name="avatarFile"
          control={control}
          render={({ field: { onChange, ref } }) => (
            <Upload accept="image/jpeg, image/png, image/tiff" maxCount={1} onChange={onChange} ref={ref}>
              <BaseButton
                htmlType="button"
                className={styles.button}
                value={t<string>('profile.buttons.upload')}
                size="large"
                type="default"
              />
            </Upload>
          )}
        />
      </BaseFlex>
    </form>
  );
};
export default connector(ProfileImageCard);
