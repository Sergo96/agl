import React from 'react';
import { useTranslation } from 'react-i18next';
import CompanyLogo from 'atoms/CompanyLogo';
import BaseFlex from 'atoms/Flex';
import BaseLink from 'atoms/Link';
import BaseTypography from 'atoms/Typography';
import Phone from 'icons/Phone';
import { AlignSelf, FlexDirection } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import styles from './index.module.scss';
import { IFooterBaseInfo } from 'interfaces/baseInfo';

interface Props extends IProps {
  baseFooterInfo?: IFooterBaseInfo;
}

const Footer: React.FC<Props> = ({ baseFooterInfo }) => {
  const [t] = useTranslation('common');
  return (
    <>
      <BaseFlex alignSelf={AlignSelf.FLEX_END} className={styles.footer}>
        <BaseFlex className={styles.category} flexDirection={FlexDirection.COLUMN}>
          <CompanyLogo theme="white" />
          <BaseFlex>
            <Phone />
            <BaseTypography className={styles.text} value={baseFooterInfo?.contacts.phone_number[0]} />
          </BaseFlex>
          <div>
            <BaseTypography className={styles.text} value={baseFooterInfo && baseFooterInfo.contacts.address} />
          </div>
        </BaseFlex>
        <BaseFlex className={styles.category} flexDirection={FlexDirection.COLUMN}>
          <BaseTypography className={styles.categoryTitle} value={t<string>('footer.company.company')} />
          <div className={styles.subCategories}>
            <BaseLink className={styles.link} href="/about-us">
              {t<string>('footer.company.aboutUs')}
            </BaseLink>
            <BaseLink className={styles.link} href="/press">
              {t<string>('footer.company.press')}
            </BaseLink>
            <BaseLink className={styles.link} href="/careers">
              {t<string>('footer.company.careers')}
            </BaseLink>
            <BaseLink className={styles.link} href="/terms-of-use">
              {t<string>('footer.company.termsOfUse')}
            </BaseLink>
            <BaseLink className={styles.link} href="/privacy-policy">
              {t<string>('footer.company.privacyPolicy')}
            </BaseLink>
            <BaseLink className={styles.link} href="/contact-us">
              {t<string>('footer.company.contactUs')}
            </BaseLink>
            <BaseLink className={styles.link} href="/blog">
              {t<string>('footer.company.blog')}
            </BaseLink>
          </div>
        </BaseFlex>
        <BaseFlex className={styles.category} flexDirection={FlexDirection.COLUMN}>
          <BaseTypography className={styles.categoryTitle} value={t<string>('footer.agronGroup.agronGroup')} />
          <div className={styles.subCategories}>
            <BaseLink className={styles.link} href="/social">
              {t<string>('footer.agronGroup.social')}
            </BaseLink>
            <BaseLink className={styles.link} href="/lettings-agents">
              {t<string>('footer.agronGroup.lettingsAgents')}
            </BaseLink>
            <BaseLink className={styles.link} href="/private">
              {t<string>('footer.agronGroup.private')}
            </BaseLink>
            <BaseLink className={styles.link} href="/owners">
              {t<string>('footer.agronGroup.owners')}
            </BaseLink>
            <BaseLink className={styles.link} href="/contractors">
              {t<string>('footer.agronGroup.contractors')}
            </BaseLink>
            <BaseLink className={styles.link} href="/insurance">
              {t<string>('footer.agronGroup.insurance')}
            </BaseLink>
          </div>
        </BaseFlex>
        <BaseFlex className={styles.category} flexDirection={FlexDirection.COLUMN}>
          <BaseTypography className={styles.categoryTitle} value={t<string>('footer.thirdCategory.thirdCategory')} />
          <div className={styles.subCategories}>
            <BaseLink className={styles.link} href="/login">
              {t<string>('footer.thirdCategory.login')}
            </BaseLink>
            <BaseLink className={styles.link} href="/how-it-works">
              {t<string>('footer.thirdCategory.howItWorks')}
            </BaseLink>
            <BaseLink className={styles.link} href="/association">
              {t<string>('footer.thirdCategory.association')}
            </BaseLink>
            <BaseLink className={styles.link} href="/join-as-trader">
              {t<string>('footer.thirdCategory.joinAsTrader')}
            </BaseLink>
            <BaseLink className={styles.link} href="/offers-and-discounts">
              {t<string>('footer.thirdCategory.offersAndDiscounts')}
            </BaseLink>
          </div>
        </BaseFlex>
      </BaseFlex>
      <div className={styles.copyright}>
        <BaseTypography value={t<string>('footer.copyrightNotice')} />
      </div>
    </>
  );
};

export default Footer;
