import TextArea from 'antd/lib/input/TextArea';
import classNames from 'classnames';
import { IBaseAtomComponentProps } from 'interfaces/props';
import inputStyles from '../Input/index.module.scss';
import { ChangeEvent } from 'react';

interface Props extends IBaseAtomComponentProps {
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const BaseInputArea: React.FC<Props> = ({ placeholder, className, ...props }) => {
  return <TextArea placeholder={placeholder} className={classNames(inputStyles.baseInput, className)} {...props} />;
};

export default BaseInputArea;
