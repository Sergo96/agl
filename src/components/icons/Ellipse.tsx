import { IProps } from 'interfaces/props';

interface Props extends IProps {}
const Ellipse: React.FC<Props> = ({ ...props }) => {
  return (
    <svg width="17" height="17" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 7.20996C12 9.97139 9.76142 12.21 7 12.21C4.23858 12.21 2 9.97139 2 7.20996C2 4.44854 4.23858 2.20996 7 2.20996C9.76142 2.20996 12 4.44854 12 7.20996Z" stroke="#52C41A" strokeWidth="4"/>
    </svg>

  );
};

export default Ellipse;
