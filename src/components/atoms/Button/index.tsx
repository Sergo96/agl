import { IBaseAtomComponentProps } from 'interfaces/props';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Button } from 'antd';

interface Props extends IBaseAtomComponentProps {
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  shape?: 'circle' | 'round';
  icon?: JSX.Element | null;
  size?: 'large' | 'middle' | 'small';
  htmlType?: 'submit' | 'button';
  form?: string;
  disabled?: boolean;
}
const BaseButton: React.FC<Props> = ({
  value,
  type,
  shape,
  className,
  icon,
  disabled,
  htmlType = 'submit',
  ...props
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      disabled={disabled}
      icon={icon}
      shape={shape}
      className={classNames(styles.btn, className)}
      {...props}
    >
      {value}
    </Button>
  );
};

export default BaseButton;
