import styles from './index.module.scss';
import { IProps } from 'interfaces/props';
import { FlexDirection, AlignItems, JustifyContent, AlignContent, AlignSelf, FlexWrap } from 'interfaces/flex';
import classNames from 'classnames';

interface Props extends IProps {
  className?: string;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  alignSelf?: AlignSelf;
  fullWidth?: boolean;
  fullHeight?: boolean;
  as?: string;
  onClick?: () => void;
}

const BaseFlex: React.FC<Props> = ({
  className,
  flexDirection,
  justifyContent,
  alignItems,
  alignContent,
  alignSelf,
  fullHeight,
  fullWidth,
  flexWrap,
  style,
  children,
  as = 'div',
  ...props
}: Props) => {
  const innerStyles = {
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    alignSelf,
    flexWrap,
    ...style
  };
  const cx = classNames(styles.wrp, fullWidth && styles.fullWidth, fullHeight && styles.fullHeight, className);
  const Tag = `${as}` as keyof JSX.IntrinsicElements;
  return (
    <Tag className={cx} style={innerStyles} {...props} >
      {children}
    </Tag>
  );
};

export default BaseFlex;
