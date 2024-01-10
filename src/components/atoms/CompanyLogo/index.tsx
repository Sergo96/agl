import { IProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IProps {
  theme?: 'main' | 'white' | 'transparent';
}

const CompanyLogo: React.FC<Props> = ({ theme = 'main', ...props }) => {
  const logoSrc = (theme: string) => {
    switch (theme) {
      case 'main':
        return '/assets/images/Logo.png';
      case 'white':
        return '/assets/images/LogoWhite.png';
      case 'transparent':
        return '/assets/images/LogoTransparent.png';
    }
    return 'main';
  };

  return (
    <div className={styles.root} {...props}>
      <img className={styles.img} src={logoSrc(theme)} alt="Company logo" />
    </div>
  );
};

export default CompanyLogo;
