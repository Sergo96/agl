import { IProps } from 'interfaces/props';

interface Props extends IProps {}
const CheckmarkCircled: React.FC<Props> = ({ ...props }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 0 9 0ZM7.605 13.1529L3.46388 9.01125L5.05463 7.4205L7.60444 9.97144L13.014 4.56187L14.6048 6.15263L7.605 13.1529Z"
        fill="#52C41A"
      />
    </svg>
  );
};

export default CheckmarkCircled;
