import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { IProps } from 'interfaces/props';

export interface ICheckboxProps extends IProps {
  onChange: (e: CheckboxChangeEvent) => void;
  value?: string | React.ReactElement;
  label?: string | React.ReactElement;
  checked?: boolean;
}

const BaseCheckbox: React.FC<ICheckboxProps> = ({ onChange, label, ...props }) => {
  return (
    <Checkbox onChange={onChange} {...props}>
      {label && label}
    </Checkbox>
  );
};

export default BaseCheckbox;
