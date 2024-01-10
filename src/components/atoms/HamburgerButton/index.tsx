import classNames from 'classnames';
import { IBaseAtomComponentProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IBaseAtomComponentProps {
  handleToggleMenu: () => void;
  menuOpen: boolean;
}

const HamburgerButton: React.FC<Props> = ({ handleToggleMenu, menuOpen, className, ...props }) => {
  const burgerClassNames = classNames(styles.burger, className, {
    [styles.burgerOpen]: menuOpen,
  });
  const burgerLinesClassNames = classNames(styles.burgerLines, {
    [styles.burgerLinesOpen]: menuOpen,
  });

  return (
    <button onClick={handleToggleMenu} className={burgerClassNames} {...props}>
      <span className={burgerLinesClassNames} />
      <span className={burgerLinesClassNames} />
      <span className={burgerLinesClassNames} />
    </button>
  );
};

export default HamburgerButton;
