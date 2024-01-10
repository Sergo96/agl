import { IProps } from 'interfaces/props';

interface Props extends IProps {}
const ArrowUp: React.FC<Props> = ({ ...props }) => {
  return (
    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 5L5 4.37114e-07L0 5L10 5Z" fill="#52C41A" />
    </svg>
  );
};

export default ArrowUp;