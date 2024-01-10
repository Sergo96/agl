import { IProps } from 'interfaces/props';

interface Props extends IProps {}
const CheckIcon: React.FC<Props> = ({ ...props }) => {
  return (
    <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8.62501 20.3757L0.60376 12.3545L4.25918 8.69905L8.62501 13.0778L21.3867 0.303223L25.0421 3.95864L8.62501 20.3757Z" fill="#1890FF"/>
    </svg>
    
  );
};

export default CheckIcon;
