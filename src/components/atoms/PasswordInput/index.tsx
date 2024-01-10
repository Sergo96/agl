import { Input } from 'antd';
import classNames from 'classnames';
import { IBaseAtomComponentProps } from 'interfaces/props';
import inputStyles from '../Input/index.module.scss';

interface Props extends IBaseAtomComponentProps {
  placeholder: string;
  label: string;
  onChange?: () => void;
}

const BasePasswordInput: React.FC<Props> = ({ placeholder, className, ...props }) => {
  return (
    <Input.Password className={classNames(inputStyles.baseInput, className)} placeholder={placeholder} {...props} />
  );
};

export default BasePasswordInput;
