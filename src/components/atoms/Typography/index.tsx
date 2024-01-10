import { IBaseAtomComponentProps } from 'interfaces/props';
import classNames from 'classnames';
import styles from './index.module.scss';

type Weight = 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold' | 'extra-bold';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
type Align = 'center' | 'left' | 'right';
type Color = 'main' | 'input' | 'secondary' | 'primary';
interface Props extends IBaseAtomComponentProps {
  weight?: Weight;
  size?: Size;
  align?: Align;
  color?: Color;
  fontSize?: number;
  uppercase?: boolean;
  lineHeight?: string;
  header?: boolean;
  nowrap?: boolean;
  title?: string;
  htmlFor?: string;
  as?: string;
  onClick?: () => void;
}

const BaseTypography: React.FC<Props> = ({
  value,
  style,
  size,
  align,
  color,
  fontSize,
  uppercase,
  lineHeight,
  header,
  nowrap,
  weight,
  className,
  as = 'span',
  ...props
}) => {
  const cx = classNames(
    {
      [styles.light]: weight === 'light',
      [styles.regular]: weight === 'regular',
      [styles.mediumWeight]: weight === 'medium',
      [styles.semiBold]: weight === 'semi-bold',
      [styles.bold]: weight === 'bold',
      [styles.extraBold]: weight === 'extra-bold',
      [styles.extraSmall]: size === 'xs',
      [styles.small]: size === 'sm',
      [styles.medium]: size === 'md',
      [styles.large]: size === 'lg',
      [styles.extraLarge]: size === 'xl',
      [styles.extraExtraLarge]: size === 'xxl',
      [styles.extraExtraExtraLarge]: size === 'xxxl',
      [styles.left]: align === 'left',
      [styles.right]: align === 'right',
      [styles.center]: align === 'center',
      [styles.mainColor]: color === 'main',
      [styles.inputColor]: color === 'input',
      [styles.secondaryColor]: color === 'secondary',
      [styles.primaryColor]: color === 'primary',
      [styles.uppercase]: !!uppercase,
      [styles.header]: !!header,
      [styles.nowrap]: !!nowrap,
    },
    className
  );
  const innerStyles = {
    fontSize,
    lineHeight,
    ...style,
  };
  const Tag = `${as}` as keyof JSX.IntrinsicElements;
  return value ? (
    <Tag className={cx} style={{ ...innerStyles }} {...props}>
      {value}
    </Tag>
  ) : null;
};

export default BaseTypography;
