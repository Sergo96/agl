import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { message, Upload } from 'antd';
import * as Yup from 'yup';
import BaseFlex from 'atoms/Flex';
import { yupResolver } from '@hookform/resolvers/yup';
import LabelInput from 'molecules/LabelInput';
import ErrorMessage from 'atoms/ErrorMessage';
import BaseTypography from 'atoms/Typography';
import { AlignItems, FlexDirection, JustifyContent } from 'interfaces/flex';
import { IPostDocument, IUserProfileInfo } from 'interfaces/profile';
import { IBaseDTO } from 'interfaces/general';
import { connect, ConnectedProps } from 'react-redux';
import { userProfileInfoSelector } from 'selectors/profile';
import { IAysAgroState } from 'store';
import { useEffect } from 'react';
import LabelSelectInput from 'molecules/LabelSelectInput';
import { statusListSelector } from 'selectors/general';
import { loadingStatusList } from 'actions/general';
import { addDocument, loadingDocumentInfo, loadingUserInfo, updateUserInfo } from 'actions/profile';
import BaseButton from 'atoms/Button';
import ArrowUpCircled from 'icons/ArrowUpCircled';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => ({
  userInfo: userProfileInfoSelector(state),
  statusList: statusListSelector(state),
});

const mapDispatchToProps = {
  updateUserProfileData: (data: IUserProfileInfo, notification: string) => updateUserInfo(data, notification),
  addDocument: (data: FormData, notification: string) => addDocument(data, notification),
  loadDocument: () => loadingDocumentInfo(),
  loadUserInfo: () => loadingUserInfo(),
  loadStatusList: () => loadingStatusList(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  statusList: IBaseDTO[];
}

const ProfileTrusteeInfo: React.FC<Props> = ({
  userInfo,
  loadUserInfo,
  loadStatusList,
  loadDocument,
  addDocument,
  updateUserProfileData,
  statusList,
}) => {
  const [t] = useTranslation('common');

  useEffect(() => {
    loadStatusList();
    loadUserInfo();
    loadDocument();
  }, []);

  useEffect(() => {
    reset(userInfo);
  }, [userInfo]);

  const statusOptions = statusList.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('auth.validation.required')),
    email: Yup.string().email(t('auth.validation.enterValidEmail')).required(t('auth.validation.required')),
    status: Yup.object().shape({
      id: Yup.number().required(t('auth.validation.required')),
    }),
    mobile_phone: Yup.string().required(t('auth.validation.required')).max(15, t('auth.validation.maximumPhoneLength')),
    work_phone: Yup.string().required(t('auth.validation.required')).max(15, t('auth.validation.maximumPhoneLength')),
    document: Yup.string(),
  });

  const defaultValues: IUserProfileInfo = {
    ...userInfo,
  };

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IUserProfileInfo>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const defaultValuesPdf: IPostDocument = {
    document: undefined,
  };

  const { control: controlPdf, watch: watchPdf } = useForm<IPostDocument>({
    defaultValues: defaultValuesPdf,
  });

  useEffect(() => {
    const document = watchPdf('document');
    if (document && document?.fileList[0]?.status === 'done') {
      const fileSizeLimit = 10;
      const isLt2M = document.fileList[0].size / 1024 / 1024 < fileSizeLimit;
      if (!isLt2M) {
        message.error(t('profile.imageCard.validationMessage'));
      } else {
        onPdfSubmit(document);
      }
    }
  }, [watchPdf('document')]);

  const onSubmit = (data: IUserProfileInfo) => {
    updateUserProfileData(data, t<string>('notifications.profileUpdateSuccess'));
  };

  const onPdfSubmit = (data: UploadChangeParam) => {
    if (data) {
      const formData = new FormData();
      if (data?.fileList[0]?.originFileObj) {
        formData.append('document', data?.fileList[0]?.originFileObj);
        addDocument(formData, t<string>('notifications.pdfUpdateSucess'));
      }
    }
  };

  return (
    <>
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
        <form id="hook-form-trustee" className={styles.section} onSubmit={handleSubmit(onSubmit)}>
          <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
            <BaseFlex className={styles.formFieldLarge} flexDirection={FlexDirection.COLUMN}>
              <Controller
                name="name"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <LabelInput
                    label={t('registration.step3.name.label')}
                    placeholder={t('registration.step3.name.placeholder')}
                    {...rest}
                  />
                )}
              />
              {errors?.name && <ErrorMessage value={errors?.name?.message} />}
            </BaseFlex>
            <BaseFlex className={styles.formFieldLarge} flexDirection={FlexDirection.COLUMN}>
              <BaseTypography className={styles.text} value={t<string>('profile.trustee.description')} />
            </BaseFlex>

            <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
              <Controller
                name="status.id"
                control={control}
                render={({ field: { ref, ...rest } }) => {
                  return (
                    <LabelSelectInput
                      label={t('registration.step3.status.label')}
                      placeholder={t('registration.step3.status.placeholder')}
                      className={styles.selectField}
                      options={statusOptions}
                      {...rest}
                    />
                  );
                }}
              />
            </BaseFlex>
            <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
              <Controller
                name="mobile_phone"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <LabelInput
                    label={t('registration.step3.mobilePhone.label')}
                    placeholder={t('registration.step3.mobilePhone.placeholder')}
                    {...rest}
                  />
                )}
              />
              {errors?.mobile_phone && <ErrorMessage value={errors?.mobile_phone?.message} />}
            </BaseFlex>
            <BaseFlex className={styles.formField_bottom} flexDirection={FlexDirection.COLUMN}>
              <Controller
                name="work_phone"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <LabelInput
                    label={t('registration.step3.workPhone.label')}
                    placeholder={t('registration.step3.workPhone.placeholder')}
                    {...rest}
                  />
                )}
              />
              {errors?.work_phone && <ErrorMessage value={errors?.work_phone?.message} />}
            </BaseFlex>
            <BaseFlex className={styles.formField_bottom} flexDirection={FlexDirection.COLUMN}>
              <Controller
                name="email"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <LabelInput
                    label={t('registration.step3.email.label')}
                    placeholder={t('registration.step3.email.placeholder')}
                    {...rest}
                  />
                )}
              />
              {errors?.email && <ErrorMessage value={errors?.email?.message} />}
            </BaseFlex>
          </BaseFlex>
        </form>

        <form className={styles.sectionPdf}>
          <BaseFlex className={styles.pdfInfo} justifyContent={JustifyContent.SPACE_BETWEEN}>
            <BaseFlex alignItems={AlignItems.CENTER}>
              <div className={styles.imgBox}>
                <img className={styles.img} src="/assets/images/PdfLogo.png" alt="Pdf file logo" />
              </div>
              <BaseTypography className={styles.pdfInfoText} value={t<string>('profile.trustee.pdfButtonText')} />
            </BaseFlex>
            <BaseTypography className={styles.text} value={t<string>('profile.trustee.pdfDescription')} />
          </BaseFlex>
          <BaseFlex className={styles.pdfUpload} justifyContent={JustifyContent.CENTER} alignItems={AlignItems.CENTER}>
            <Controller
              name="document"
              control={controlPdf}
              render={({ field: { onChange, ref } }) => (
                <Upload
                  accept="application/pdf"
                  className={styles.pdfUploadButton}
                  maxCount={1}
                  onChange={onChange}
                  ref={ref}
                >
                  <BaseButton
                    icon={<ArrowUpCircled />}
                    htmlType="button"
                    value={t<string>('profile.trustee.upload')}
                    size="large"
                    type="default"
                  />
                </Upload>
              )}
            />
          </BaseFlex>
        </form>
      </BaseFlex>
      <BaseFlex justifyContent={JustifyContent.END} className={styles.buttons}>
        <BaseButton
          className={styles.cancelButton}
          onClick={() => reset(defaultValues)}
          value={t<string>('profile.buttons.cancel')}
          size="large"
          type="default"
          htmlType="button"
        />
        <BaseButton
          form="hook-form-trustee"
          className={styles.submitButton}
          value={t<string>('profile.buttons.save')}
          size="large"
          type="primary"
        />
      </BaseFlex>
    </>
  );
};
export default connector(ProfileTrusteeInfo);
