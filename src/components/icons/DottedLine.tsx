import { IProps } from 'interfaces/props';

interface Props extends IProps {}
const DottedLine: React.FC<Props> = ({ ...props }) => {
  return (
    <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="7" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="14" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="21" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="28" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="35" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="42" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="49" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="56" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="63" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="70" width="2" height="3" rx="1" fill="#C4C4C4" />
      <rect y="77" width="2" height="3" rx="1" fill="#C4C4C4" />
    </svg>
  );
};

export default DottedLine;
